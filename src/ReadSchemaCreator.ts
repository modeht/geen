import ts from 'typescript';
import { Node, TreeParser } from './TreeParser.js';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types/index.js';
import { globalsDirPath as globalsDirPath } from './utils.js';
import { ReadSchemaFiltersCreator } from './ReadSchemaFiltersCreator.js';
import { ReadSchemaRelationsCreator } from './ReadSchemaRelationsCreator.js';
import { ReadSchemaOrdersCreator } from './ReadSchemaOrdersCreator.js';

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
		this._setDefaultImports();
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
		const orders = new ReadSchemaOrdersCreator(this.ast, this.entityPath, this.asts);

		filters.baseSetup();
		relations.baseSetup();
		orders.baseSetup();

		const files = await Promise.all([filters.buildFile(), relations.buildFile(), orders.buildFile()]);

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
				return `import ${f.importName} from '${f.relativePath}'`;
			});

		const importsText = Array.from(this.imports).join('\n');

		let file = `import * as v from 'valibot';
${importsText}\n
${relativePaths.join(';\n')};\n`;

		const schema = `const Read${this.entityName}Schema = v.optional(v.object({
filters: v.optional(${files[0]['schemaName']}),
relations: v.optional(${files[1]['schemaName']}),
orders: v.optional(${files[2]['schemaName']}),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));\n`;
		file += schema;
		const schemaName = `Read${this.entityName}Schema`;
		file += `export default ${schemaName};\n`;

		//add type inference
		const inputTypeName = `TRead${this.entityName}SchemaInput`;
		const outputTypeName = `TRead${this.entityName}SchemaOutput`;
		const typeInference = `export type ${inputTypeName} = v.InferInput<typeof ${schemaName}>;
export type ${outputTypeName} = v.InferOutput<typeof ${schemaName}>;
`;
		file += typeInference;

		//save file
		await writeFile(this.toBeSavedAbs, file);

		return {
			absPath: this.toBeSavedAbs,
			schemaName: schemaName,
			inputType: inputTypeName,
			outputType: outputTypeName,
			entityName: this.entityName,
			fullEntityName: this.fullEntityName,
			fileName: this.fileName,
			savedFileName: this.toBeSaved,
		};
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

	_setDefaultImports() {
		const utilFileRelPath = relative(this.dtoDirAbsPath, globalsDirPath).split(sep).join('/');
		this.imports?.add(`import { ReadPaginationSchema } from "${utilFileRelPath}/schemas/pagination.schema"`);
	}

	_setSavedFilename() {
		this.toBeSaved = `read-${this.fileName}-query.schema.ts`;
	}
}
