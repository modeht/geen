import ts from 'typescript';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types/index.js';
import { prettierOptions } from './utils.js';
import { CreateSchemaCreator } from './CreateSchemaCreator.js';
import { UpdateSchemaCreator } from './UpdateSchemaCreator.js';
import { ReadSchemaCreator } from './ReadSchemaCreator.js';
import prettier from 'prettier';
import { Cwd } from './Cwd.js';

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
	private appModulePath: string;
	private entityPath: string;
	private entitySourceFile: ts.SourceFile;
	constructor(
		private ast: string,
		private asts: ASTs
	) {
		this.entityPath = this.asts[this.ast].fullPath;
		this.entitySourceFile = this.asts[this.ast].sourceFile;
		this.appModulePath = join(Cwd.getInstance(), 'src/geen-modules.ts');
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

		const c = new CreateSchemaCreator(this.ast, this.asts);
		const u = new UpdateSchemaCreator(this.ast, this.asts);
		const r = new ReadSchemaCreator(this.ast, this.asts);
		r.baseSetup();

		const [create, update, read] = await Promise.all([c.buildFile(), u.buildFile(), r.build()]);
		const readOne = await r.buildOne();

		const service = await this._createService(create, update, read, readOne);
		const controller = await this._createController(create, update, read, readOne, service);
		const module = await this._createModule(create, service, controller);

		//add module to geen-modules.ts
		await this.addToEntry(module);
	}

	async addToEntry(module: ModuleFileInfo) {
		let moduleTemplate = await readFile(this.appModulePath, 'utf8');

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
			relative(dirname(this.appModulePath), module.moduleAbsPath).split(sep).join('/').replace('.ts', '') +
			'";';

		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, importsStart + importsToken.length),
			importStr,
			moduleTemplate.slice(importsStart + importsToken.length)
		);

		moduleTemplate = await prettier.format(moduleTemplate, prettierOptions);
		await writeFile(this.appModulePath, moduleTemplate);
	}

	async _createService(create: SchemaInfo, update: SchemaInfo, read: SchemaInfo, readOne: SchemaInfo) {
		let serviceTemplate = await readFile(join(process.cwd(), 'templates/service.template'), 'utf8');
		const imports = new Set();
		imports.add(`import { Injectable } from '@nestjs/common'`);
		imports.add(`import { DataSource } from 'typeorm'`);
		imports.add(`import { AbstractService } from '../geen/services/abstract-service'`);

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
			`import ${readOne.schemaName}, { ${readOne.inputType}, ${readOne.outputType} } from './${
				this.dtoDirPath
			}/${readOne.savedFileName?.replace('.ts', '')}'`
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

			async readOneRow(id: number, query: ${readOne.outputType}){
				return await this.service.readOne(${read.fullEntityName}, id, query);
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

		serviceTemplate = await prettier.format(serviceTemplate, prettierOptions);
		await writeFile(serviceAbsPath, serviceTemplate);
		return {
			serviceClassName,
			serviceAbsPath: serviceAbsPath.split(sep).join('/'),
		};
	}

	async _createController(
		create: SchemaInfo,
		update: SchemaInfo,
		read: SchemaInfo,
		readOne: SchemaInfo,
		serviceFileInfo: ServiceFileInfo
	) {
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
			`import ${readOne.schemaName}, { ${readOne.inputType}, ${readOne.outputType} } from './${
				this.dtoDirPath
			}/${readOne.savedFileName?.replace('.ts', '')}'`
		);

		imports.add(
			`import { ${create.fullEntityName} } from './entities/${this.entityPath.split('/').at(-1)?.replace('.ts', '')}'`
		);
		imports.add(`import { ApiBody, ApiQuery } from '@nestjs/swagger'`);

		const projectRelPath = relative(join(this.dtoDirAbsPath, '..'), join(Cwd.getInstance(), 'src'))
			.split(sep)
			.join('/');
		const geenDirPath = join(Cwd.getInstance(), 'src/geen');
		const utilFileRelPath = relative(join(this.dtoDirAbsPath, '..'), geenDirPath).split(sep).join('/');
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
		const readOneSchemaName = readOne.savedFileName.split('.')[0].split('-').map(capitalize).join('');

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

		const readOneMethod = `
			@Get(':id')
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.${readOneSchemaName}
				}
			})
			async readOne(
				@Param('id') id: string,
				@MoQuery(${readOne.schemaName}) query: ${readOne.outputType},
			) {
				return this.service.readOneRow(+id, query);
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
		methods.add(readOneMethod);

		controllerTemplate = controllerTemplate.replace('<<classMethods>>', Array.from(methods).join('\n'));

		controllerTemplate = controllerTemplate.replace('<<classProperties>>', '');

		const controllerAbsPath = join(this.dtoDirAbsPath, '..', 'generated-' + create.fileName + '.controller.ts');

		controllerTemplate = await prettier.format(controllerTemplate, prettierOptions);
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

		moduleTemplate = await prettier.format(moduleTemplate, prettierOptions);
		await writeFile(moduleAbsPath, moduleTemplate);
		return { moduleAbsPath: moduleAbsPath.split(sep).join('/'), moduleClassName };
	}
}
