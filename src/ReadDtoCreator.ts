import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative, resolve, sep } from 'path';
import { ASTs } from './lib/types';
import { globalsDirPath } from './utils';
import { mkdirSync } from 'fs';

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

export class ReadDtoCreator {
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
	dtoDirName: string;
	dtoDirPath: string;
	dtoDirRelPath: string;
	dtoDirAbsPath: string;

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

		this.dtoDirName = 'read';
		this.dtoDirPath = `generated-dtos/${this.dtoDirName}`;
		//this is supposed to be under same module
		//entity should be under main module
		//
		this.dtoDirAbsPath = join(dirname(this.ogFilePath), '..', this.dtoDirPath);
		//make sure the dto directory exists
		mkdirSync(this.dtoDirAbsPath, { recursive: true });

		//relative path to dto directory from entity
		this.dtoDirRelPath = relative(
			this.ogFilePath,
			join(dirname(this.ogFilePath), '..', this.dtoDirPath)
		);
	}

	async build(parenClassName: string = '', parentFileName: string = '') {
		this._setEntityName();
		this._setClassName(parenClassName);
		this._setFilename();
		this._setDefaultImports();
		this._setEnums();

		//the dto will be saved with this name
		const savedFileName = `read${parentFileName ? '-' + parentFileName : ''}-${
			this.fileName
		}.dto.ts`;

		//path of the dto exactly
		const newDtoFilePath = join(
			this.ogFilePath,
			`${this.dtoDirRelPath}/${savedFileName}`
		);

		//relative path from the new to be saved file to the original entity file for imports use
		const ogDirRelPath = relative(dirname(newDtoFilePath), this.ogFilePath);

		this.imports = new Set([
			...this.imports,
			...this.absoluteImports?.map((i) => {
				//take relative imports from main entity file and map those imports to the dto file with the correct relative paths
				const relativePath = relative(dirname(newDtoFilePath), i.absPath)
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
			ogDirRelPath.split(sep).join('/').replaceAll('.ts', '')
		);

		await writeFile(newDtoFilePath, dtoTemplate);

		return {
			dtoFilePath: newDtoFilePath,
			className: this.className,
			entityName: this.entityName,
		};
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
		this.className = `Read${(customName ?? '') + this.entityName}Dto`;
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

		//TODO: we need a script to make sure these important files exists
		const relationDecoRelPath = relative(this.dtoDirAbsPath, globalsDirPath)
			.split(sep)
			.join('/');

		this.imports?.add(
			`import { Relation } from '${relationDecoRelPath}/decorators/relation.decorator';`
		);
		this.imports.add(
			`import { IsOptionalIf } from '${relationDecoRelPath}/validators/is-option-if.validator';`
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
