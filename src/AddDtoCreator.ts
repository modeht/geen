import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { DtoFieldBuilder } from './DtoFieldBuilder';
import { appModulePath } from './utils';

export type AddDtoInfo = {
	absPath: string;
	className: string;
	entityName: string; //remove entity or model name from it
	fileName: string; //remove entity or model name from it
	savedFileName: string; //remove entity or model name from it
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

export class AddDtoCreator {
	parsedTree: Node;
	className: string | undefined;
	entityName: string | undefined;
	entityClass: Node | undefined;
	fileName: string | undefined;
	imports: Set<string> = new Set();
	absoluteImports: { absPath: string; importedFields: string[] }[] = [];
	enums: string[] = [];
	properties: string[] = [];
	ogFilePath: string;
	maxDepth: number = 1;
	currDepth: number = 0;
	validationsImports: Set<string> = new Set();
	transformationsImports: Set<string> = new Set();
	asts: ASTs;
	dtoFieldBuilder: DtoFieldBuilder;

	constructor(
		ast: ts.SourceFile,
		ogPath: string,
		asts: ASTs,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.ogFilePath = ogPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
		this.asts = asts;
		this.dtoFieldBuilder = new DtoFieldBuilder(this);
	}

	async build(parenClassName: string = '', parentFileName: string = '') {
		await mkdir(join(dirname(this.ogFilePath), '../generated-dtos'), { recursive: true });
		this._setEntityName();
		this._setClassName(parenClassName);
		this._setFilename();
		this._setDefaultImports();
		this._setEnums();
		await this.dtoFieldBuilder._setFields();

		const savedFileName = `add${parentFileName ? '-' + parentFileName : ''}-${
			this.fileName
		}.dto.ts`;

		const dtoDirRelativePath = relative(
			this.ogFilePath,
			join(dirname(this.ogFilePath), '../generated-dtos')
		);

		const dtoFilePath = join(this.ogFilePath, `${dtoDirRelativePath}/${savedFileName}`);
		const ogFileDirPath = relative(dirname(dtoFilePath), this.ogFilePath);

		this.imports = new Set([
			...this.imports,
			...this.absoluteImports?.map((i) => {
				const relativePath = relative(dirname(dtoFilePath), i.absPath)
					.split(sep)
					.join('/')
					.replaceAll('.ts', '');
				return `import { ${i.importedFields.join(', ')} } from '${
					relativePath.startsWith('.') ? relativePath : './' + relativePath
				}'`;
			}),
		]);

		let dtoTemplate = await readFile(
			join(process.cwd(), 'templates/dto.template'),
			'utf8'
		);
		dtoTemplate = dtoTemplate.replaceAll(
			'<<imports>>',
			Array.from(this.imports).join('\n')
		);
		dtoTemplate = dtoTemplate.replaceAll('<<enums>>', this.enums.join('\n'));
		dtoTemplate = dtoTemplate.replaceAll('<<dtoClass>>', this.className!);
		dtoTemplate = dtoTemplate.replaceAll('<<properties>>', this.properties.join('\n\n'));
		dtoTemplate = dtoTemplate.replaceAll(
			'<<validationsImports>>',
			Array.from(this.validationsImports).join(', ')
		);
		dtoTemplate = dtoTemplate.replaceAll(
			'<<transformationsImports>>',
			Array.from(this.transformationsImports).join(', ')
		);
		dtoTemplate = dtoTemplate.replaceAll(
			'<<pathToOriginal>>',
			ogFileDirPath.split(sep).join('/').replaceAll('.ts', '')
		);

		await writeFile(dtoFilePath, dtoTemplate);
		//i need the dto classname, dto absolue path
		if (this.currDepth === 0) {
			//this checks if it is entry point file
			const dto = {
				absPath: dtoFilePath,
				className: this.className!,
				entityName: this.entityName!,
				fileName: this.fileName!,
				savedFileName: savedFileName,
			};

			const service = await this._initService(dto);
			const controller = await this._initController(dto, service);
			const module = await this._initModule(dto, service, controller);
			//add module to app.module.ts
			await this.addToEntry(module);
		}
		return {
			dtoFilePath,
			className: this.className,
			entityName: this.entityName,
		};
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
			relative(dirname(appModulePath), module.moduleAbsPath)
				.split(sep)
				.join('/')
				.replace('.ts', '') +
			'";';

		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, importsStart + importsToken.length),
			importStr,
			moduleTemplate.slice(importsStart + importsToken.length)
		);

		await writeFile(appModulePath, moduleTemplate);
	}

	async _initService(addDtoInfo: AddDtoInfo) {
		let serviceTemplate = await readFile(
			join(process.cwd(), 'templates/service.template'),
			'utf8'
		);
		const imports = new Set();
		imports.add(`import { Injectable } from '@nestjs/common'`);
		imports.add(`import { DataSource } from 'typeorm'`);
		imports.add(`import { AbstractService } from '../globals/services/abstract-service'`);
		imports.add(
			`import { ${
				addDtoInfo.className
			} } from './generated-dtos/${addDtoInfo.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${addDtoInfo.entityName} } from './entities/${this.ogFilePath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);
		//add dto class import
		serviceTemplate = serviceTemplate.replace(
			'<<imports>>',
			Array.from(imports).join('\n')
		);

		const name = addDtoInfo.fileName
			.toLowerCase()
			.replace('-entity', '')
			.replace('-model', '');

		const className = addDtoInfo.entityName.replace('Entity', '').replace('Model', '');
		const serviceClassName = className + 'Service';
		serviceTemplate = serviceTemplate.replace('<<serviceClass>>', serviceClassName);

		//add service file
		const defaultConstructor = `constructor(private datasource: DataSource, private service: AbstractService){}`;
		serviceTemplate = serviceTemplate.replace('<<classConstructor>>', defaultConstructor);

		const createMethod = `
			async createRow(body: ${addDtoInfo.className}){
				return await this.service.create(${addDtoInfo.entityName}, ${addDtoInfo.className}, body);
			}
		`;

		const methods = new Set();
		methods.add(createMethod);
		serviceTemplate = serviceTemplate.replace(
			'<<classMethods>>',
			Array.from(methods).join('\n')
		);

		serviceTemplate = serviceTemplate.replace('<<classProperties>>', '');

		const serviceAbsPath = join(
			this.ogFilePath,
			'../..',
			'generated-' + name + '.service.ts'
		);

		await writeFile(serviceAbsPath, serviceTemplate);
		return {
			serviceClassName,
			serviceAbsPath: serviceAbsPath.split(sep).join('/'),
		};
	}

	async _initController(addDtoInfo: AddDtoInfo, serviceFileInfo: ServiceFileInfo) {
		let controllerTemplate = await readFile(
			join(process.cwd(), 'templates/controller.template'),
			'utf8'
		);
		const imports = new Set();
		imports.add(`import { Controller, Post, Body } from '@nestjs/common';`);
		imports.add(
			`import { ${
				addDtoInfo.className
			} } from './generated-dtos/${addDtoInfo.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${
				serviceFileInfo.serviceClassName
			} } from './${serviceFileInfo.serviceAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);

		//add dto class import
		controllerTemplate = controllerTemplate.replace(
			'<<imports>>',
			Array.from(imports).join('\n')
		);

		const name = addDtoInfo.fileName
			.toLowerCase()
			.replace('-entity', '')
			.replace('-model', '');
		controllerTemplate = controllerTemplate.replace('<<routeName>>', `'${name}'`);

		const className = addDtoInfo.entityName.replace('Entity', '').replace('Model', '');
		const controllerClassName = className + 'Controller';
		controllerTemplate = controllerTemplate.replace(
			'<<controllerClass>>',
			controllerClassName
		);

		//add service file
		const defaultConstructor = `constructor(private service: ${serviceFileInfo.serviceClassName}){}`;
		controllerTemplate = controllerTemplate.replace(
			'<<classConstructor>>',
			defaultConstructor
		);

		const createMethod = `
			@Post()
			async create(@Body() body: ${addDtoInfo.className}){
				return this.service.createRow(body);
			}
		`;
		const methods = new Set();
		methods.add(createMethod);
		controllerTemplate = controllerTemplate.replace(
			'<<classMethods>>',
			Array.from(methods).join('\n')
		);

		controllerTemplate = controllerTemplate.replace('<<classProperties>>', '');

		const controllerAbsPath = join(
			this.ogFilePath,
			'../..',
			'generated-' + name + '.controller.ts'
		);

		await writeFile(controllerAbsPath, controllerTemplate);
		return {
			controllerAbsPath: controllerAbsPath.split(sep).join('/'),
			controllerClassName,
		};
	}

	async _initModule(
		addDtoInfo: AddDtoInfo,
		serviceFileInfo: ServiceFileInfo,
		controllerFileInfo: ControllerFileInfo
	) {
		let moduleTemplate = await readFile(
			join(process.cwd(), 'templates/module.template'),
			'utf8'
		);
		const imports = new Set();
		imports.add(`import { Module } from '@nestjs/common';`);
		imports.add(
			`import { ${
				serviceFileInfo.serviceClassName
			} } from './${serviceFileInfo.serviceAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${
				controllerFileInfo.controllerClassName
			} } from './${controllerFileInfo.controllerAbsPath
				.split('/')
				.at(-1)
				?.replace('.ts', '')}'`
		);

		moduleTemplate = moduleTemplate.replace(
			'<<imports>>',
			Array.from(imports).join('\n')
		);

		moduleTemplate = moduleTemplate.replace('<<moduleImports>>', '');
		moduleTemplate = moduleTemplate.replace(
			'<<moduleControllers>>',
			controllerFileInfo.controllerClassName
		);
		moduleTemplate = moduleTemplate.replace(
			'<<moduleProviders>>',
			serviceFileInfo.serviceClassName
		);
		moduleTemplate = moduleTemplate.replace(
			'<<moduleExports>>',
			serviceFileInfo.serviceClassName
		);

		const className = addDtoInfo.entityName.replace('Entity', '').replace('Model', '');
		const moduleClassName = className + 'Module';
		moduleTemplate = moduleTemplate.replace('<<moduleClass>>', moduleClassName);

		const name = addDtoInfo.fileName
			.toLowerCase()
			.replace('-entity', '')
			.replace('-model', '');

		const moduleAbsPath = join(
			this.ogFilePath,
			'../..',
			'generated-' + name + '.module.ts'
		);

		await writeFile(moduleAbsPath, moduleTemplate);
		return { moduleAbsPath: moduleAbsPath.split(sep).join('/'), moduleClassName };
	}

	_setEntityName() {
		const entityClass = this.parsedTree.classes?.find((c) =>
			c.decorators?.find((d) => d.text?.startsWith('@Entity'))
		);
		if (!entityClass) throw new Error('no entity class found');
		this.entityName = entityClass.name!;
		this.entityClass = entityClass;
	}

	_setClassName(customName?: string) {
		this.className = `Add${(customName ?? '') + this.entityName}Dto`;
	}

	_setFilename() {
		this.fileName = this.entityName
			?.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();
	}

	_setDefaultImports() {
		this.parsedTree.imports?.forEach((i) => {
			i.module = i.module?.replaceAll("'", '');
			if (i.module?.startsWith('.')) {
				const targetDestAbs = join(dirname(this.ogFilePath), i.module);
				this.absoluteImports.push({
					absPath: targetDestAbs.replaceAll('.ts', ''),
					importedFields: i.identifiers?.map((i) => i.expression!)!,
				});
			} else if (i.module === 'typeorm') {
				//do nothing
			} else {
				this.imports.add(i.text?.replaceAll('.ts', '')!);
			}
		});

		//validation lib
		this.imports?.add('import { <<validationsImports>> } from "class-validator";');
		this.imports?.add('import { <<transformationsImports>> } from "class-transformer";');

		//TODO: fixed relative import here is risky, think of something
		this.imports?.add(
			"import { Relation } from '../../globals/decorators/relation.decorator';"
		);
		this.imports.add(
			"import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';"
		);
	}

	_setEnums() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//make an import statement
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					const importStmnt = `import { ${enumKey} } from '<<pathToOriginal>>'`;
					this.imports.add(importStmnt);
				}
			} else {
				this.enums.push(e.text!);
			}
		});
	}
}
