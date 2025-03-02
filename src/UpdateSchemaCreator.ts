import ts from 'typescript';
import { Node, TreeParser } from './TreeParser.js';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types/index.js';
import { log, warn } from 'console';
import { Cwd } from './Cwd.js';
import prettier from 'prettier';
import { prettierOptions } from './utils.js';
import { ColumnOption } from './CreateSchemaCreator.js';
import { mapStringOptions } from './valibot-options.js';

export type UpdateDtoInfo = {
	absPath: string;
	className: string;
	entityName: string;
	fileName: string;
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

export enum PrimitiveTypes {
	'number',
	'string',
	'boolean',
	'string[]',
	'number[]',
	'boolean[]',
	'Date',
	'Date[]',
}

export type TypeKeywords = 'One' | 'Many';
export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class UpdateSchemaCreator {
	parsedTree: Node;
	schemaName: string;
	entityName: string;
	fullEntityName: string;
	entityClass: Node;
	fileName: string;
	imports: Set<string> = new Set();
	enumAbsoluteImports: { absPath: string; importedFields: string[] }[] = [];
	enums: string[] = [];
	properties: string[] = [];
	entityPath: string;
	maxDepth: number = 1;
	currDepth: number = 0;
	validationsImports: Set<string> = new Set();
	transformationsImports: Set<string> = new Set();
	asts: ASTs;
	ast: ts.SourceFile;
	astKey: string;
	dtoDirName: string;
	dtoDirPath: string;
	dtoDirRelPath: string;
	dtoDirAbsPath: string;
	updateSchemaText: string;
	toBeSaved: string;
	toBeSavedAbs: string;

	constructor(ast: string, asts: ASTs, { maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }) {
		this.asts = asts;
		this.astKey = ast;
		this.ast = this.asts[ast].sourceFile;
		this.entityPath = this.asts[ast].fullPath;
		this.parsedTree = TreeParser.parse(this.ast);

		this.maxDepth = maxDepth;
		this.currDepth = currDepth;

		//some defaults
		this.baseSetup();
	}

	private baseSetup() {
		this._setEntityName();
		this._setSchemaName();
		this._setFilename();
		this._setSavedFilename();
		this._prepDir();
		this._setDefaultImports();
		this._setEnumImports();
	}

	_prepFile() {
		if (!this.dtoDirRelPath) {
			throw new Error('use _buildDir() to configure schema dir path');
		}

		this.toBeSavedAbs = join(this.entityPath, this.dtoDirRelPath, this.toBeSaved);
	}

	_prepDir() {
		this.dtoDirName = '';
		this.dtoDirPath = `generated-schemas/${this.dtoDirName}`;
		this.dtoDirAbsPath = join(dirname(this.entityPath), '..', this.dtoDirPath);
		this.dtoDirRelPath = relative(this.entityPath, this.dtoDirAbsPath).split(sep).join('/');
	}

	private async _buildDir() {
		await mkdir(this.dtoDirAbsPath, { recursive: true });
	}

	async buildFile() {
		if (!this.updateSchemaText) {
			this.parseFields();
		}

		await this._buildDir();

		const enums = this.enumAbsoluteImports.map((i) => {
			const actPath = relative(this.dtoDirAbsPath, i.absPath).split(sep).join('/').replace('.ts', '');
			return `import { ${i.importedFields.join(', ')} } from '${actPath}'`;
		});

		let file = this.updateSchemaText;
		//add imports
		const importsText = Array.from(this.imports).join('\n');
		file = `${importsText}\n
${Array.from(new Set(this.enums)).join('\n')}
${Array.from(new Set(enums)).join('\n')}
${file}`;
		//add type inference

		const inputTypeName = `TUpdate${this.entityName}SchemaInput`;
		const outputTypeName = `TUpdate${this.entityName}SchemaOutput`;
		const schemaTypeInference = `export type ${inputTypeName} = v.InferInput<typeof ${this.schemaName}>;
export type ${outputTypeName} = v.InferOutput<typeof ${this.schemaName}>;`;
		file += `\n\n${schemaTypeInference}\n`;

		file = await prettier.format(file, prettierOptions);
		//save file
		await writeFile(join(this.entityPath, this.dtoDirRelPath, this.toBeSaved), file);

		//return the data need for wide importing later

		return {
			absPath: this.toBeSavedAbs,
			schemaName: this.schemaName,
			inputType: inputTypeName,
			outputType: outputTypeName,
			entityName: this.entityName,
			fullEntityName: this.fullEntityName,
			fileName: this.fileName,
			savedFileName: this.toBeSaved,
		};
	}

	//for fields parsing
	excludedFields: string[] = ['id', 'updatedAt', 'createdAt', 'created_at', 'updated_at'];

	extractOptions(field: Node) {
		const args = field.decorators
			?.find((d) => d.text?.startsWith('@Column'))
			?.functions?.find((f) => f.expression === 'Column')?.props;

		const mapped =
			args?.map((a) => {
				const split = a.statement?.split(':') ?? [];
				return { key: split?.[0]?.trim()?.replaceAll("'", ''), value: split?.[1]?.trim()?.replaceAll("'", '') };
			}) ?? [];

		return mapped;
	}

	addValibotOptions(t: string, mapper: (options: ColumnOption[]) => string[], options: ColumnOption[]) {
		const pipeline = mapper(options);
		if (pipeline.length > 0) {
			t = `v.pipe(${t}, ${pipeline.join(', ')})`;
		}
		return t;
	}

	parseFields({ fields }: { fields?: Node[] } = {}) {
		if (!fields) {
			if (!this.entityClass?.properties) {
				throw new Error('Initialize build first');
			}
			fields = this.entityClass.properties;
		}

		const schema: string[] = [];
		const metadatas: string[] = [`[modelSymbol]: '${this.fullEntityName}'`];

		for (const field of fields) {
			if (this.excludedFields.includes(field.name!)) continue;

			const fieldTypes = field.type?.split('|').map((t) => t.trim());
			if (!fieldTypes) continue;

			const fieldOptions = this.extractOptions(field);

			const fieldOptional = Boolean(field.optional);
			const optionalByDefault = this.currDepth === 0 ? true : false;
			const columnNullable = fieldOptions?.find((o) => o.key === 'nullable')?.value === 'true' || false;
			let fieldPrimitive: number | undefined;
			let fieldNullable: boolean = columnNullable;
			let fieldUndefindable: boolean = fieldOptional || optionalByDefault;

			fieldTypes.forEach((t) => {
				if (PrimitiveTypes[t] !== undefined) {
					fieldPrimitive = PrimitiveTypes[t];
				} else if (t === 'null') {
					fieldNullable = true;
				} else if (t === 'undefined') {
					fieldUndefindable = true;
				}
			});

			let fieldAsString = '';
			if (fieldPrimitive !== undefined) {
				//handle primitives
				let t = '';
				if (fieldPrimitive === PrimitiveTypes['number']) {
					t = 'v.number()';
				} else if (fieldPrimitive === PrimitiveTypes['string']) {
					t = 'v.string()';
					t = this.addValibotOptions(t, mapStringOptions, fieldOptions);
				} else if (fieldPrimitive === PrimitiveTypes['boolean']) {
					t = 'v.boolean()';
				} else if (fieldPrimitive === PrimitiveTypes['number[]']) {
					t = 'v.array(v.number())';
				} else if (fieldPrimitive === PrimitiveTypes['string[]']) {
					t = 'v.string()';
					t = this.addValibotOptions(t, mapStringOptions, fieldOptions);
					t = `v.array(${t})`;
				} else if (fieldPrimitive === PrimitiveTypes['boolean[]']) {
					t = 'v.array(v.boolean())';
				} else if (fieldPrimitive === PrimitiveTypes['Date']) {
					//TODO: handle different kind of dates
					t = "v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())";
				} else if (fieldPrimitive === PrimitiveTypes['Date[]']) {
					t = "v.array(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()))";
				}

				t = this._handleEmptyStates(t, fieldNullable, fieldUndefindable);

				fieldAsString = `${field.name}: ${t}`;
				schema.push(fieldAsString);
				continue;
			}

			const {
				fieldEnum,
				fieldNotSupported,
				fieldRelation,
				fieldRelationHasFk,
				fieldRelationMeta,
				relationClass,
				relationClassImport,
				relationRequired,
				relationFileImport,
				fieldNotRelation,
				relationType,
			} = this._extractRelationInfo(field);

			if (fieldNotSupported) {
				continue;
			}

			if (fieldNotRelation) {
				let t = 'v.any()';
				t = this._handleEmptyStates(t, fieldNullable, fieldUndefindable);

				fieldAsString = `${field.name}: ${t}`;
				schema.push(fieldAsString);
				continue;
			}

			if (fieldEnum) {
				const enumDef = fieldEnum.functions?.[0].props?.find((p) => p.statement?.trim()?.startsWith('enum'));
				const enumType = enumDef?.identifiers?.[1].expression;

				const enumImport = this._findImportAbsPath(enumType!);
				if (enumImport) {
					this.enumAbsoluteImports.push(enumImport);
				}

				let t = `v.enum(${enumType!})`;
				t = this._handleEmptyStates(t, fieldNullable, fieldUndefindable);
				t = `${field.name}: ${t}`;
				schema.push(t);
			}

			if (fieldRelation && this.currDepth < this.maxDepth) {
				//get class fields -> parseFields
				if (!relationFileImport) {
					warn(`relation field ${field.name!} ast not found`);
					continue;
				}

				const nestedUpdateSchema = new UpdateSchemaCreator(relationFileImport, this.asts, {
					currDepth: this.currDepth + 1,
					maxDepth: this.maxDepth - this.currDepth,
				});
				const nestedFields = nestedUpdateSchema.parseFields();
				this.enumAbsoluteImports = [...this.enumAbsoluteImports, ...nestedUpdateSchema.enumAbsoluteImports];
				this.enums = [...this.enums, ...nestedUpdateSchema.enums];
				this.imports = new Set([...this.imports, ...nestedUpdateSchema.imports]);

				let fieldAsString = '';
				if (relationType === 'OneToMany') {
					fieldAsString = `v.array(v.object({id:v.number()})), v.array(${nestedFields.validationObject})`;
				} else if (relationType === 'ManyToMany') {
					//TODO: see if you can extract the joined table columns
					fieldAsString = `v.array(${nestedFields.validationObject})`;
				} else {
					fieldAsString = `v.object({ id: v.number() }), ${nestedFields.validationObject}`;
				}
				fieldAsString = `v.union([${fieldAsString}])`;
				//either connect with id, or add it
				fieldAsString = this._handleEmptyStates(
					fieldAsString,
					!relationRequired ? true : fieldNullable,
					!relationRequired ? true : fieldUndefindable
				);
				metadatas.push(`${field.name!}: '${relationClass}'`);
				schema.push(`${field.name!}: ${fieldAsString}`);
			}
		}

		const metadataObject = `v.metadata({${metadatas.join(',\n')}})`;
		const validationObject = `v.object({${schema.join(',\n')}})`;
		//TODO: can be useful later
		const exportStatment = `const ${this.schemaName} = v.pipe(${validationObject},${metadataObject});
export default ${this.schemaName};`;

		this.updateSchemaText = exportStatment;
		return { exportStatment, validationObject };
	}

	_handleEmptyStates(field: string, nullable: boolean, undefindable: boolean) {
		if (undefindable && nullable) {
			field = `v.nullish(${field})`;
		} else if (undefindable && !nullable) {
			field = `v.optional(${field})`;
		} else if (nullable && !undefindable) {
			field = `v.nullish(${field})`;
		}
		return field;
	}

	_findImportAbsPath(enumType: string) {
		const importFrom = this.parsedTree.imports?.find((i) => i.text?.includes(enumType!));
		if (importFrom) {
			const impPathRel = importFrom.module?.replace(/['"]/g, '');
			const impPathAbs = join(dirname(this.entityPath), impPathRel!);
			return {
				importedFields: [enumType!],
				absPath: impPathAbs,
			};
		}
	}

	_extractRelationInfo(field: Node) {
		let fieldEnum: Node | undefined;
		let fieldRelation: Node | undefined;
		let fieldRelationMeta: Node | undefined;
		let fieldRelationHasFk: boolean = false;
		let fieldNotSupported = false;
		let fieldNotRelation = false;
		let relationFn: Node | undefined;
		let relationType: Relationships | undefined;
		let relationClass: string | undefined;
		let relationClassImport: Node | undefined;
		let relationFileImport: string | undefined;
		let relationRequired: boolean = false;

		field.decorators?.forEach((d) => {
			if (d.text?.startsWith('@Column') && d.text?.includes('enum')) {
				fieldEnum = d;
			} else if (d.text?.match(/(One|Many)To(One|Many)/)?.length) {
				fieldRelation = d;
			} else if (d.text?.includes('JoinColumn')) {
				fieldRelationMeta = d;
				fieldRelationHasFk = true;
			} else if (d.text?.includes('JoinTable')) {
				fieldRelationMeta = d;
				//TODO: handle conjuction table
			} else if (d.text?.match(/Tree(Parent|Children)/)?.length) {
				fieldNotSupported = true;
			} else {
				if (!fieldRelation) fieldNotRelation = true;
			}
		});

		relationFn = fieldRelation?.functions?.find((f) =>
			[
				'ManyToMany',
				'OneToOne',
				'OneToMany',
				'ManyToOne',
				//TODO: support tree structures
			].includes(f.expression!)
		);

		relationRequired =
			relationFn?.props?.find((p) => p.statement?.startsWith('nullable'))?.statement?.includes('false') || false;
		relationType = relationFn?.identifiers?.[0]?.expression as Relationships;
		relationClass = relationFn?.arrowFn?.[0]?.identifiers?.[0]?.expression;

		if (relationClass) {
			relationClassImport = this.parsedTree.imports?.find(
				(i) => i?.identifiers?.findIndex((id) => id?.expression === relationClass)! > -1
			) || {
				module: `import { ${relationClass!} } from '${this.entityPath.replace('.ts', '')}'`,
			};

			relationFileImport = relationClassImport.module?.split('/')?.at(-1)?.replace("'", '');
		}

		return {
			fieldEnum,
			fieldRelation,
			fieldRelationMeta,
			fieldRelationHasFk,
			fieldNotSupported,
			relationType,
			relationClass,
			relationClassImport,
			relationFileImport,
			relationRequired,
			fieldNotRelation,
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

	_setSchemaName() {
		this.schemaName = `Update${this.entityName}Schema`;
		return this.schemaName;
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
		this.toBeSaved = `update-${this.fileName}.schema.ts`;
	}

	_setDefaultImports() {
		const globalsDirPath = join(Cwd.getInstance(), 'src/geen');
		const utilFileRelPath = relative(this.dtoDirAbsPath, globalsDirPath).split(sep).join('/');
		this.imports?.add(`import { modelSymbol } from "${utilFileRelPath}/constants/schema-symbols"`);
		this.imports?.add("import * as v from 'valibot';");
	}

	_setEnumImports() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//if it is exported, make an import statement from the entity file
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					this.enumAbsoluteImports.push({
						absPath: this.entityPath,
						importedFields: [enumKey],
					});
				}
			} else {
				//not exported, means just make a copy of it and use it inside of the schema file needed
				this.enums.push(e.text!);
			}
		});
	}
}
