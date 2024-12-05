import ts from 'typescript';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types/index.js';
import { appModulePath, globalsDirPath as globalsDirPath, projectPath } from './utils.js';
import { CreateSchemaCreator } from './CreateSchemaCreator.js';
import { UpdateSchemaCreator } from './UpdateSchemaCreator.js';
import { ReadSchemaCreator } from './ReadSchemaCreator.js';

export type SchemaInfo = {
	absPath: string;
	schemaName: string;
	inputType: string;
	outputType: string;
	fileName: string;
	entityName: string;
	fullEntityName: string;
	savedFileName: string;
};

export type ServiceFileInfo = {
	serviceClassName: string;
	serviceAbsPath: string;
};

export type ControllerFileInfo = {
	controllerClassName: string;
	controllerAbsPath: string;
};

export type ModuleFileInfo = {
	moduleClassName: string;
	moduleAbsPath: string;
};

export type TypeKeywords = 'One' | 'Many';

export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class ModuleCreator {
	private dtoDirName: string;
	private dtoDirPath: string;
	private dtoDirAbsPath: string;
	private dtoDirRelPath: string;

	constructor(private entityPath: string, private entitySourceFile: ts.SourceFile, private asts: ASTs) {
		this._prepDir();
	}

	_prepDir() {
		this.dtoDirName = '';
		this.dtoDirPath = `generated-schemas/${this.dtoDirName}`;
		this.dtoDirAbsPath = join(dirname(this.entityPath), '..', this.dtoDirPath);
		this.dtoDirRelPath = relative(this.entityPath, this.dtoDirAbsPath).split(sep).join('/');
	}

	async build() {
		//build create,update,read schemas
		//create serivce, controller, and module for all of them

		const c = new CreateSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		const u = new UpdateSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		const r = new ReadSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		r.baseSetup();

		const [create, update, read] = await Promise.all([c.buildFile(), u.buildFile(), r.build()]);

		const service = await this._createService(create, update, read);
		const controller = await this._createController(create, update, read, service);
		const module = await this._createModule(create, service, controller);

		//add module to generated-modules.ts
		await this.addToEntry(module);
	}

	async addToEntry(module: ModuleFileInfo) {
		let moduleTemplate = await readFile(appModulePath, 'utf8');

		const importsToken = '//imports';
		const modulesToken = '//modules';
		const modulesStart = moduleTemplate.indexOf(modulesToken);
		if (modulesStart === -1) {
			throw new Error('Malformed generated module file');
		}

		const moduleName = '\nGenerated' + module.moduleClassName + ',';
		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, modulesStart + modulesToken.length),
			moduleName,
			moduleTemplate.slice(modulesStart + modulesToken.length)
		);

		const importsStart = moduleTemplate.indexOf(importsToken);
		if (importsStart === -1) {
			throw new Error('Malformed generated module file');
		}
		const importStr =
			`\nimport { ${module.moduleClassName} as Generated${module.moduleClassName} } from "./` +
			relative(dirname(appModulePath), module.moduleAbsPath).split(sep).join('/').replace('.ts', '') +
			'";';

		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, importsStart + importsToken.length),
			importStr,
			moduleTemplate.slice(importsStart + importsToken.length)
		);

		await writeFile(appModulePath, moduleTemplate);
	}

	async _createService(create: SchemaInfo, update: SchemaInfo, read: SchemaInfo) {
		let serviceTemplate = await readFile(join(process.cwd(), 'templates/service.template'), 'utf8');
		const imports = new Set();
		imports.add(`import { Injectable } from '@nestjs/common'`);
		imports.add(`import { DataSource } from 'typeorm'`);
		imports.add(`import { AbstractService } from '../globals/services/abstract-service'`);

		imports.add(
			`import ${create.schemaName}, { ${create.inputType}, ${create.outputType} } from './${
				this.dtoDirPath
			}/${create.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${update.schemaName}, { ${update.inputType}, ${update.outputType} } from './${
				this.dtoDirPath
			}/${update.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${read.schemaName}, { ${read.inputType}, ${read.outputType} } from './${
				this.dtoDirPath
			}/${read.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${create.fullEntityName} } from './entities/${this.entityPath.split('/').at(-1)?.replace('.ts', '')}'`
		);

		//add dto class import
		serviceTemplate = serviceTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

		const name = create.fileName;

		const serviceClassName = create.entityName + 'Service';
		serviceTemplate = serviceTemplate.replace('<<serviceClass>>', serviceClassName);

		//add service file
		const defaultConstructor = `constructor(private datasource: DataSource, private service: AbstractService){}`;
		serviceTemplate = serviceTemplate.replace('<<classConstructor>>', defaultConstructor);

		const methodsStr = `
			async createRow(body: ${create.outputType}){
				return await this.service.create(${read.fullEntityName}, body);
			}

			async updateRow(id: number, body: ${update.outputType}){
				return await this.service.update(${read.fullEntityName}, id, body);
			}

			async readRows(query: ${read.outputType}){
				return await this.service.read(${read.fullEntityName}, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(${read.fullEntityName}, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(${read.fullEntityName}, id, { soft: true });
			}
		`;

		const methods = new Set();
		methods.add(methodsStr);
		serviceTemplate = serviceTemplate.replace('<<classMethods>>', Array.from(methods).join('\n'));

		serviceTemplate = serviceTemplate.replace('<<classProperties>>', '');

		const serviceAbsPath = join(this.entityPath, '../..', 'generated-' + name + '.service.ts');

		await writeFile(serviceAbsPath, serviceTemplate);
		return {
			serviceClassName,
			serviceAbsPath: serviceAbsPath.split(sep).join('/'),
		};
	}

	async _createController(create: SchemaInfo, update: SchemaInfo, read: SchemaInfo, serviceFileInfo: ServiceFileInfo) {
		let controllerTemplate = await readFile(join(process.cwd(), 'templates/controller.template'), 'utf8');
		const imports = new Set();
		imports.add(`import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';`);

		imports.add(
			`import ${create.schemaName}, { ${create.inputType}, ${create.outputType} } from './${
				this.dtoDirPath
			}/${create.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${update.schemaName}, { ${update.inputType}, ${update.outputType} } from './${
				this.dtoDirPath
			}/${update.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${read.schemaName}, { ${read.inputType}, ${read.outputType} } from './${
				this.dtoDirPath
			}/${read.savedFileName?.replace('.ts', '')}'`
		);

		imports.add(
			`import { ${create.fullEntityName} } from './entities/${this.entityPath.split('/').at(-1)?.replace('.ts', '')}'`
		);
		imports.add(`import { ApiBody, ApiQuery } from '@nestjs/swagger'`);

		const projectRelPath = relative(join(this.dtoDirAbsPath, '..'), join(projectPath, 'src')).split(sep).join('/');
		const utilFileRelPath = relative(join(this.dtoDirAbsPath, '..'), globalsDirPath).split(sep).join('/');
		imports.add(
			`import { SchemaDefs } from "${projectRelPath.startsWith('.') ? '' : './'}${projectRelPath}/schema-defs"`
		);
		imports.add(
			`import { MoBody } from "${
				utilFileRelPath.startsWith('.') ? '' : './'
			}${utilFileRelPath}/decorators/mo-body.decorator"`
		);
		imports.add(
			`import { MoQuery } from "${
				utilFileRelPath.startsWith('.') ? '' : './'
			}${utilFileRelPath}/decorators/mo-query.decorator"`
		);
		imports.add(
			`import { ${serviceFileInfo.serviceClassName} } from './${serviceFileInfo.serviceAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);

		//add dto class import
		controllerTemplate = controllerTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

		controllerTemplate = controllerTemplate.replace('<<routeName>>', `'${create.fileName}'`);

		const controllerClassName = create.entityName + 'Controller';
		controllerTemplate = controllerTemplate.replace('<<controllerClass>>', controllerClassName);

		//add service file
		const defaultConstructor = `constructor(private service: ${serviceFileInfo.serviceClassName}){}`;
		controllerTemplate = controllerTemplate.replace('<<classConstructor>>', defaultConstructor);
		const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
		const createSchemaName = create.savedFileName.split('.')[0].split('-').map(capitalize).join('');
		const updateSchemaName = update.savedFileName.split('.')[0].split('-').map(capitalize).join('');
		const readSchemaName = read.savedFileName.split('.')[0].split('-').map(capitalize).join('');

		const createMethod = `
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.${createSchemaName}
				}
			})
			async create(
				@MoBody(${create.schemaName}) body: ${create.outputType},
			) {
				return this.service.createRow(body);
			}
		`;

		const updateMethod = `
			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.${updateSchemaName}
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(${update.schemaName}) body: ${update.outputType},
			) {
				return this.service.updateRow(+id, body);
			}
		`;

		const readMethod = `
			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.${readSchemaName}
				}
			})
			async read(
				@MoQuery(${read.schemaName}) query: ${read.outputType},
			) {
				return this.service.readRows(query);
			}
		`;

		const deleteMethod = `
			@Delete(':id')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.deleteRow(+id);
			}
		`;

		const softDeleteMethod = `
			@Delete(':id/soft')
			async softDelete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		`;

		const methods = new Set();
		methods.add(createMethod);
		methods.add(updateMethod);
		methods.add(readMethod);
		methods.add(deleteMethod);
		methods.add(softDeleteMethod);

		controllerTemplate = controllerTemplate.replace('<<classMethods>>', Array.from(methods).join('\n'));

		controllerTemplate = controllerTemplate.replace('<<classProperties>>', '');

		const controllerAbsPath = join(this.dtoDirAbsPath, '..', 'generated-' + create.fileName + '.controller.ts');

		await writeFile(controllerAbsPath, controllerTemplate);
		return {
			controllerAbsPath: controllerAbsPath.split(sep).join('/'),
			controllerClassName,
		};
	}

	async _createModule(create: SchemaInfo, serviceFileInfo: ServiceFileInfo, controllerFileInfo: ControllerFileInfo) {
		let moduleTemplate = await readFile(join(process.cwd(), 'templates/module.template'), 'utf8');
		const imports = new Set();
		imports.add(`import { Module } from '@nestjs/common';`);
		imports.add(
			`import { ${serviceFileInfo.serviceClassName} } from './${serviceFileInfo.serviceAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${controllerFileInfo.controllerClassName} } from './${controllerFileInfo.controllerAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);

		moduleTemplate = moduleTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

		moduleTemplate = moduleTemplate.replace('<<moduleImports>>', '');
		moduleTemplate = moduleTemplate.replace('<<moduleControllers>>', controllerFileInfo.controllerClassName);
		moduleTemplate = moduleTemplate.replace('<<moduleProviders>>', serviceFileInfo.serviceClassName);
		moduleTemplate = moduleTemplate.replace('<<moduleExports>>', serviceFileInfo.serviceClassName);

		const className = create.entityName;
		const moduleClassName = className + 'Module';
		moduleTemplate = moduleTemplate.replace('<<moduleClass>>', moduleClassName);

		const name = create.fileName;

		const moduleAbsPath = join(this.dtoDirAbsPath, '..', 'generated-' + name + '.module.ts');

		await writeFile(moduleAbsPath, moduleTemplate);
		return { moduleAbsPath: moduleAbsPath.split(sep).join('/'), moduleClassName };
	}
}
