import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { appModulePath, globalsDirPath as globalsDirPath } from './utils';
import { mkdirSync } from 'fs';
import { log, warn } from 'console';
import { ReadSchemaFiltersCreator } from './ReadSchemaFiltersCreator';
import { ReadSchemaRelationsCreator } from './ReadSchemaRelationsCreator';

export type ReadDtoInfo = {
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

export enum PrimitiveTypes {
	'number',
	'string',
	'boolean',
	'Date',
	'string[]',
	'number[]',
	'boolean[]',
	'Date[]',
}

export type TypeKeywords = 'One' | 'Many';
export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class ReadSchemaCreator {
	parsedTree: Node;
	entityClass: Node;
	entityPath: string;
	entityName: string;
	fullEntityName: string;
	fileName: string;
	imports: Set<string> = new Set();
	asts: ASTs;
	ast: ts.SourceFile;
	dtoDirName: string;
	dtoDirPath: string;
	dtoDirRelPath: string;
	dtoDirAbsPath: string;
	toBeSaved: string;
	toBeSavedAbs: string;

	constructor(ast: ts.SourceFile, entityPath: string, asts: ASTs) {
		this.ast = ast;
		this.parsedTree = TreeParser.parse(ast);
		this.entityPath = entityPath;
		this.asts = asts;
	}

	baseSetup() {
		this._setEntityName();
		this._setFilename();
		this._setSavedFilename();
		this._prepDir();
		this._prepFile();
	}

	_prepDir() {
		this.dtoDirName = '';
		this.dtoDirPath = `generated-schemas/${this.dtoDirName}`;
		this.dtoDirAbsPath = join(dirname(this.entityPath), '..', this.dtoDirPath);
		this.dtoDirRelPath = relative(this.entityPath, this.dtoDirAbsPath).split(sep).join('/');
	}

	_prepFile() {
		if (!this.dtoDirRelPath) {
			throw new Error('use _buildDir() to configure schema dir path');
		}

		this.toBeSavedAbs = join(this.entityPath, this.dtoDirRelPath, this.toBeSaved);
	}

	async _buildDir() {
		//this is supposed to be under same module
		//entity should be under main module
		//assuming entity dir is one level inside of the module dir. TODO: i am not sure if this is the best approach maybe refactor later
		await mkdir(this.dtoDirAbsPath, { recursive: true });
	}

	async build() {
		await this._buildDir();

		const filters = new ReadSchemaFiltersCreator(this.ast, this.entityPath, this.asts);
		const relations = new ReadSchemaRelationsCreator(this.ast, this.entityPath, this.asts);

		filters.baseSetup();
		relations.baseSetup();

		const files = await Promise.all([filters.buildFile(), relations.buildFile()]);

		//
		const relativePaths = files
			.map((f) => {
				return {
					relativePath: relative(dirname(this.toBeSavedAbs), f.absPath).split(sep).join('/').replace('.ts', ''),
					importName: f.schemaName,
				};
			})
			.map((f) => {
				return {
					...f,
					relativePath: f.relativePath.startsWith('.') ? f.relativePath : `./${f.relativePath}`,
				};
			})
			.map((f) => {
				return `import { ${f.importName} } from '${f.relativePath}'`;
			});

		let file = `import * as v from 'valibot';
${relativePaths.join(';\n')};\n`;

		const schema = `export const Read${this.entityName}Schema = v.object({
filters: v.nullish(${files[0]['schemaName']}),
relations: v.nullish(${files[1]['schemaName']}),
});\n`;
		file += schema;

		const typeInference = `export type TRead${this.entityName}SchemaInput = v.InferInput<typeof Read${this.entityName}Schema>;
export type TRead${this.entityName}SchemaOutput = v.InferOutput<typeof Read${this.entityName}Schema>;
`;
		file += typeInference;

		//save file
		await writeFile(this.toBeSavedAbs, file);
	}

	_setEntityName(name?: string) {
		const entityClass = this.parsedTree.classes?.find((c) => c.decorators?.find((d) => d.text?.startsWith('@Entity')));

		if (!entityClass) throw new Error('no entity class found');
		this.entityClass = entityClass;
		if (name) {
			this.entityName = name.replace(/entity/gi, '').replace(/model/gi, '');
			this.fullEntityName = name;
		} else {
			this.entityName = entityClass.name!.replace(/entity/gi, '').replace(/model/gi, ''); //ie: Category
			this.fullEntityName = entityClass.name!;
		}
	}

	_setFilename() {
		//Category -> category
		//AdminUser -> admin-user
		this.fileName = this.entityName
			.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();

		return this.fileName;
	}

	_setSavedFilename() {
		this.toBeSaved = `read-${this.fileName}.schema.ts`;
	}
}
