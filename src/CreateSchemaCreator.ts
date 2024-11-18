import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { log, warn } from 'console';

export type CreateDtoInfo = {
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
	'string[]',
	'number[]',
	'boolean[]',
	'Date',
	'Date[]',
}

export type TypeKeywords = 'One' | 'Many';
export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class CreateSchemaCreator {
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
	dtoDirName: string;
	dtoDirPath: string;
	dtoDirRelPath: string;
	dtoDirAbsPath: string;
	createSchemaText: string;
	toBeSaved: string;
	toBeSavedAbs: string;

	constructor(
		ast: ts.SourceFile,
		entityPath: string,
		asts: ASTs,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		// console.dir(this.parsedTree.imports, { depth: null });
		this.entityPath = entityPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
		this.asts = asts;
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
		if (!this.createSchemaText) {
			this.parseFields();
		}

		await this._buildDir();

		const enums = this.enumAbsoluteImports.map((i) => {
			const actPath = relative(this.dtoDirAbsPath, i.absPath).split(sep).join('/').replace('.ts', '');
			return `import { ${i.importedFields.join(', ')} } from '${actPath}'`;
		});

		let file = this.createSchemaText;
		//add imports
		const importsText = Array.from(this.imports).join('\n');
		file = `${importsText}\n
${Array.from(new Set(this.enums)).join('\n')}
${Array.from(new Set(enums)).join('\n')}
${file}`;
		//add type inference
		const schemaTypeInference = `export type TCreate${this.entityName}SchemaInput = v.InferInput<typeof ${this.schemaName}>;
export type TCreate${this.entityName}SchemaOutput = v.InferOutput<typeof ${this.schemaName}>;`;
		file += `\n\n${schemaTypeInference}\n`;

		//save file
		await writeFile(join(this.entityPath, this.dtoDirRelPath, this.toBeSaved), file);

		//return the data need for wide importing later
	}

	//for fields parsing
	excludedFields: string[] = ['id', 'updatedAt', 'createdAt', 'updated_at', 'created_at'];

	parseFields({ fields }: { fields?: Node[] } = {}) {
		if (!fields) {
			if (!this.entityClass?.properties) {
				throw new Error('Initialize build first');
			}
			fields = this.entityClass.properties;
		}

		const schema: string[] = [];
		const metadatas: string[] = [];

		for (const field of fields) {
			if (this.excludedFields.includes(field.name!)) continue;

			const fieldTypes = field.type!.split('|').map((t) => t.trim());

			const fieldOptional = Boolean(field.optional);
			const columnNullable =
				field.decorators
					?.find((d) => d.text?.startsWith('@Column'))
					?.props?.find((p) => p.statement?.startsWith('nullable'))
					?.statement?.includes('true') || false;

			let fieldPrimitive: number | undefined;
			let fieldNullable: boolean = columnNullable;
			let fieldUndefindable: boolean = fieldOptional;

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
				} else if (fieldPrimitive === PrimitiveTypes['boolean']) {
					t = 'v.boolean()';
				} else if (fieldPrimitive === PrimitiveTypes['number[]']) {
					t = 'v.array(v.number())';
				} else if (fieldPrimitive === PrimitiveTypes['string[]']) {
					t = 'v.array(v.string())';
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
				relationType,
			} = this._extractRelationInfo(field);

			if (fieldNotSupported) {
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
				const ast = this.asts[relationFileImport];
				const nestedCreateSchema = new CreateSchemaCreator(ast.sourceFile, ast.fullPath, this.asts, {
					currDepth: this.currDepth + 1,
					maxDepth: this.maxDepth - this.currDepth,
				});
				const nestedFields = nestedCreateSchema.parseFields();
				this.enumAbsoluteImports = [...this.enumAbsoluteImports, ...nestedCreateSchema.enumAbsoluteImports];
				this.enums = [...this.enums, ...nestedCreateSchema.enums];
				this.imports = new Set([...this.imports, ...nestedCreateSchema.imports]);

				let fieldAsString = '';
				if (relationType === 'OneToMany' || relationType === 'ManyToMany') {
					fieldAsString = `v.array(v.number()), v.array(${nestedFields.validationObject})`;
				} else {
					fieldAsString = `v.number(), ${nestedFields.validationObject}`;
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
		const exportStatment = `export const ${this.schemaName} = v.pipe(${validationObject},${metadataObject})`;
		this.createSchemaText = exportStatment;
		return { exportStatment, validationObject };
	}

	_handleEmptyStates(field: string, nullable: boolean, undefindable: boolean) {
		if (undefindable && nullable) {
			field = `v.nullish(${field})`;
		} else if (undefindable && !nullable) {
			field = `v.undefinedable(${field})`;
		} else if (nullable && !undefindable) {
			field = `v.nullish(${field})`;
		}
		return field;
	}

	_findImportAbsPath(enumType: string) {
		const importFrom = this.parsedTree.imports?.find((i) => i.text?.includes(enumType!));
		if (importFrom) {
			const impPathRel = importFrom.module?.replaceAll("'", '').replaceAll('"', '');
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
				module: `import { ${relationClass!} } from '${this.entityPath.replaceAll('.ts', '')}'`,
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
		this.schemaName = `Create${this.entityName}Schema`;
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
		this.toBeSaved = `create-${this.fileName}.schema.ts`;
	}

	_setDefaultImports() {
		this.imports?.add("import * as v from 'valibot';");
	}

	_setEnumImports() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			// if (this.entityName === 'ShopperProfile') {
			// 	log('2');
			// }
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
