import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { appModulePath, globalsDirPath as globalsDirPath } from './utils';
import { mkdirSync } from 'fs';
import { dir, log, warn } from 'console';

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

export class ReadSchemaFiltersCreator {
	parsedTree: Node;
	filtersSchemaName: string;
	entityName: string;
	fullEntityName: string;
	entityClass: Node;
	fileName: string;
	imports: Set<string> = new Set();
	absoluteImports: { absPath: string; importedFields: string[] }[] = [];
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
	readSchemaText: string;
	toBeSaved: string;
	toBeSavedAbs: string;

	constructor(
		ast: ts.SourceFile,
		entityPath: string,
		asts: ASTs,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.entityPath = entityPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
		this.asts = asts;
	}

	baseSetup() {
		this._setEntityName();
		this._setFiltersSchemaName();
		this._setFilename();
		this._setSavedFilename();
		this._prepDir();
		this._prepFile();
		this._setDefaultImports();
		this._setEnumImports();
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

	async buildFile() {
		if (!this.readSchemaText) {
			this._parseFields();
		}
		await this._buildDir();

		let file = this.readSchemaText;

		const enums = this.absoluteImports.map((i) => {
			const actPath = relative(this.dtoDirAbsPath, i.absPath).split(sep).join('/').replace('.ts', '');
			return `import { ${i.importedFields.join(', ')} } from '${actPath}'`;
		});

		//add imports
		const importsText = Array.from(this.imports).join('\n');
		file = `${importsText}\n
${Array.from(new Set(this.enums)).join('\n')}
${Array.from(new Set(enums)).join('\n')}
${file}`;

		//add type inference
		const schemaTypeInference = `export type TRead${this.entityName}FiltersSchemaOutput = v.InferOutput<typeof ${this.filtersSchemaName}>;
export type TRead${this.entityName}FiltersSchemaInput = v.InferInput<typeof ${this.filtersSchemaName}>;`;
		file += `\n\n${schemaTypeInference}\n`;

		//save file
		await writeFile(this.toBeSavedAbs, file);

		//return the data need for wide importing later
		return { absPath: this.toBeSavedAbs, schemaName: this.filtersSchemaName };
	}

	//for fields parsing
	excludedFields: string[] = ['id', 'updatedAt', 'createdAt', 'updated_at', 'created_at'];

	_parseFields({ fields }: { fields?: Node[] } = {}) {
		if (!fields) {
			if (!this.entityClass?.properties) {
				throw new Error('Initialize build first');
			}
			fields = this.entityClass.properties;
		}

		const filtersSchema: string[] = [];
		const filtersSchemaClass: string[] = [];
		const metadatas: string[] = [];

		for (const field of fields) {
			if (this.excludedFields.includes(field.name!)) continue;

			const fieldTypes = field.type!.split('|').map((t) => t.trim());

			//filters are optionals by default

			const fieldOptional = true;
			const columnNullable = true;

			let fieldPrimitive: number | undefined;
			let fieldNullable: boolean = columnNullable;
			let fieldUndefindable: boolean = fieldOptional;

			fieldTypes.forEach((t) => {
				if (PrimitiveTypes[t] !== undefined) {
					fieldPrimitive = PrimitiveTypes[t];
				}
			});

			if (fieldPrimitive !== undefined) {
				let fieldAsString = '';
				let propertyAsString = '';

				let t = '';
				let p = '';

				if (fieldPrimitive === PrimitiveTypes['number']) {
					p = 'GenericComparable<"number">';
					t = 'comparable("number")';
				} else if (fieldPrimitive === PrimitiveTypes['string']) {
					p = 'GenericComparable<"string">';
					t = 'comparable("string")';
				} else if (fieldPrimitive === PrimitiveTypes['boolean']) {
					p = 'GenericComparable<"bool">';
					t = 'comparable("bool")';
				} else if (fieldPrimitive === PrimitiveTypes['Date']) {
					p = 'GenericComparable<"date">';
					t = 'comparable("date")';
				} else if (fieldPrimitive === PrimitiveTypes['number[]']) {
					p = 'GenericComparable<"number">[]';
					t = 'v.array(comparable("number"))';
				} else if (fieldPrimitive === PrimitiveTypes['string[]']) {
					p = 'GenericComparable<"string">[]';
					t = 'v.array(comparable("string"))';
				} else if (fieldPrimitive === PrimitiveTypes['boolean[]']) {
					p = 'GenericComparable<"bool">[]';
					t = 'v.array(comparable("bool"))';
				} else if (fieldPrimitive === PrimitiveTypes['Date[]']) {
					p = 'GenericComparable<"date">[]';
					t = 'v.array(comparable("date"))';
				}

				t = this._handleEmptyStates(t, fieldNullable, fieldUndefindable);
				p = this._handleClassEmptyStates(p, fieldNullable, fieldUndefindable);

				fieldAsString = `${field.name}: ${t}`;
				propertyAsString = `${field.name}${p.startsWith('?:') ? p : `: ${p}`}`;

				filtersSchema.push(fieldAsString);
				filtersSchemaClass.push(propertyAsString);

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
					this.absoluteImports.push(enumImport);
				}

				let t = `v.enum(${enumType!})`;
				t = this._handleEmptyStates(t, fieldNullable, fieldUndefindable);
				t = `${field.name}: ${t}`;
				let p = this._handleClassEmptyStates(enumType!, fieldNullable, fieldUndefindable);
				p = `${field.name}${p.startsWith('?:') ? p : `: ${p}`}`;
				filtersSchema.push(t);
				filtersSchemaClass.push(p);
			}

			if (fieldRelation && this.currDepth < this.maxDepth) {
				//get class fields -> parseFields
				if (!relationFileImport) {
					warn(`relation field ${field.name!} ast not found`);
					continue;
				}
				const ast = this.asts[relationFileImport];
				const nestedReadSchema = new ReadSchemaFiltersCreator(ast.sourceFile, ast.fullPath, this.asts, {
					currDepth: 0,
					maxDepth: 0,
				});
				nestedReadSchema.baseSetup();
				const { key, property } = this._createFiltersField(field.name!, nestedReadSchema);

				filtersSchema.push(key);
				filtersSchemaClass.push(property);
			}
		}

		// const metadataObject = `v.metadata({${metadatas.join(',\n')}})`;
		const validationObject = `v.object({${filtersSchema.join(',\n')}})`;
		const classPropsObject = `${filtersSchemaClass.join(';\n')}`;

		const filtersClassName = `${this.filtersSchemaName}Filters`;

		const classExportStatment = `export class ${filtersClassName} {${classPropsObject}}`;
		const schemaExportStatment = `const ${this.filtersSchemaName}: v.GenericSchema<${filtersClassName}> = ${validationObject};\n
export default ${this.filtersSchemaName};
`;

		this.readSchemaText = `${classExportStatment}\n\n${schemaExportStatment}\n\n`;

		return {
			schemaExportStatment,
			classExportStatment,
			validationObject,
			classPropsObject,
		};
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

	private _createFiltersField(fieldName: string, nestedReadSchema: ReadSchemaFiltersCreator) {
		const nestedFiltersSchemaName = nestedReadSchema.filtersSchemaName;
		const nestedFiltersClassName = `${nestedReadSchema.filtersSchemaName}Filters`;

		const nestedSchemaFilePath = nestedReadSchema.toBeSavedAbs;

		if (nestedFiltersSchemaName !== this.filtersSchemaName) {
			const relPathToNested = relative(this.dtoDirAbsPath, nestedSchemaFilePath)
				.split(sep)
				.join('/')
				.replace('.ts', '');

			this.imports.add(
				`import ${nestedFiltersSchemaName}, { ${nestedFiltersClassName} } from '${
					relPathToNested.startsWith('.') ? relPathToNested : `./${relPathToNested}`
				}'`
			);
		}

		let key = '';
		let property = '';

		key = `v.nullish(v.lazy(() => ${nestedFiltersSchemaName}))`;
		property = `${nestedFiltersClassName} | null`;

		key = `${fieldName}: ${key}`;
		property = `${fieldName}?: ${property}`;
		return { key, property };
	}

	_handleClassEmptyStates(field: string, nullable: boolean, undefindable: boolean) {
		if (undefindable && nullable) {
			field = `?: ${field} | null`;
		} else if (undefindable && !nullable) {
			field = `?: ${field}`;
		} else if (nullable && !undefindable) {
			field = `: ${field} | null`;
		}
		return field;
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

	_setFiltersSchemaName() {
		this.filtersSchemaName = `Read${this.entityName}FiltersSchema`;
		return this.filtersSchemaName;
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
		this.toBeSaved = `read-${this.fileName}-filters.schema.ts`;
	}

	_setDefaultImports() {
		const utilFileRelPath = relative(this.dtoDirAbsPath, globalsDirPath).split(sep).join('/');
		this.imports?.add(`import { GenericComparable, comparable } from "${utilFileRelPath}/lib/comparable"`);
		this.imports?.add("import * as v from 'valibot';");
	}

	_setEnumImports() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//if it is exported, make an import statement from the entity file
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					const relPathToEntity = relative(this.dtoDirAbsPath, this.entityPath).split(sep).join('/').replace('.ts', '');
					const importStmnt = `import { ${enumKey} } from '${relPathToEntity}';`;
					this.imports.add(importStmnt);
				}
			} else {
				//not exported, means just make a copy of it and use it inside of the schema file needed
				this.enums.push(e.text!);
			}
		});
	}
}
