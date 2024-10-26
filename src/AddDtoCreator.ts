import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { dir, error, log, warn } from 'console';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';

type TypeKeywords = 'One' | 'Many';
type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class AddDtoCreator {
	private parsedTree: Node;
	private className: string | undefined;
	private entityName: string | undefined;
	private entityClass: Node | undefined;
	private fileName: string | undefined;
	private imports: Set<string> = new Set();
	private absoluteImports: { absPath: string; importedFields: string[] }[] = [];
	private enums: string[] = [];
	private properties: string[] = [];
	private ogFilePath: string;
	private maxDepth: number = 1;
	private currDepth: number = 0;
	private validationsImports: Set<string> = new Set();
	private transformationsImports: Set<string> = new Set();

	constructor(
		ast: ts.SourceFile,
		private asts: ASTs,
		ogPath: string,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.ogFilePath = ogPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
	}

	async build(parenClassName: string = '', parentFileName: string = '') {
		await mkdir(join(dirname(this.ogFilePath), '../generated-dtos'), { recursive: true });
		this._setEntityName();
		this._setClassName(parenClassName);
		this._setFilename();
		this._setDefaultImports();
		this._setEnums();
		await this._setFields();

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

		if (dtoTemplate.includes('<<pathToOriginal>>')) {
			log(ogFileDirPath);
		}
		await writeFile(dtoFilePath, dtoTemplate);
		return { dtoFilePath, className: this.className, entityName: this.entityName };
	}

	private _setEntityName() {
		const entityClass = this.parsedTree.classes?.find((c) =>
			c.decorators?.find((d) => d.text?.startsWith('@Entity'))
		);
		if (!entityClass) throw new Error('no entity class found');
		this.entityName = entityClass.name!;
		this.entityClass = entityClass;
	}

	private _setClassName(customName?: string) {
		this.className = `Add${(customName ?? '') + this.entityName}Dto`;
	}

	private _setFilename() {
		this.fileName = this.entityName
			?.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();
	}

	private _setDefaultImports() {
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

	private _setEnums() {
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

	private addImport(importStr: string) {
		this.imports.add(importStr);
	}

	getParsedTree() {
		return this.parsedTree;
	}

	private async _setFields() {
		const fields = this.entityClass?.properties || [];
		const fieldsStringified: string[] = [];

		for (const field of fields) {
			if (['updatedAt', 'createdAt', 'updated_at', 'created_at'].includes(field.name!))
				continue;

			let fieldText = '';
			let fieldNullable = false;
			let fieldEnum = false;
			let fieldNotSupported = false;
			let includeFieldRelated: boolean | null = null;
			let fieldPrimitive = true;
			const validations: string[] = [];
			const types = field.type?.split('|').map((t) => t.trim()) || [];

			//leave id for nested because it might be used
			if (['id'].includes(field.name!) && this.currDepth === 0) continue;

			for (const type of types) {
				if (type === 'null' || type === 'undefined') {
					validations.push('@IsOptional()');
					this.validationsImports.add('IsOptional');
					fieldNullable = true;
				} else if (type === 'string') {
					validations.push('@IsString()');
					this.validationsImports.add('IsString');
				} else if (type === 'string[]') {
					validations.push('@IsString({each:true})');
					this.validationsImports.add('IsString');
				} else if (type === 'number') {
					validations.push('@IsNumber()');
					this.validationsImports.add('IsNumber');
				} else if (type === 'number[]') {
					validations.push('@IsNumber({},{each:true})');
					this.validationsImports.add('IsNumber');
				} else if (type === 'Date') {
					validations.push('@IsDate()\n@Type(()=>Date)');
					this.validationsImports.add('IsDate');
					this.transformationsImports.add('Type');
				} else if (type === 'boolean') {
					validations.push('@IsBoolean()');
					this.validationsImports.add('IsBoolean');
				} else {
					fieldPrimitive = false;
				}
			}

			if (field.name === 'id') {
				if (!field.type?.includes('null')) field.type += '| null';
				validations.push(`@IsOptional()`);
				this.validationsImports.add('IsOptional');
				fieldNullable = true;
			} else if (field.name !== 'id' && this.currDepth > 0) {
				if (!fieldNullable) {
					if (!field.type?.includes('null')) field.type += '| null';
					fieldNullable = true;
					validations.push(`@IsOptionalIf((obj,_)=>!!obj.id)`);
				}
			}

			let enumCol: Node | undefined;
			let relationCol: Node | undefined;
			let relationExtra: Node | undefined;
			let relationHasFk: boolean = false;

			field.decorators?.forEach((d) => {
				if (d.text?.startsWith('@Column') && d.text?.includes('enum')) {
					enumCol = d;
				} else if (d.text?.match(/(One|Many)To(One|Many)/)?.length) {
					relationCol = d;
				} else if (d.text?.includes('JoinColumn')) {
					relationExtra = d;
					relationHasFk = true;
				} else if (d.text?.includes('JoinTable')) {
					relationExtra = d;
					//TODO: handle conjuction table
				} else if (d.text?.match(/Tree(Parent|Children)/)?.length) {
					fieldNotSupported = true;
				}
			});

			if (fieldNotSupported) {
				continue;
			}

			if (enumCol) {
				fieldEnum = true;
				field.type?.split('|').forEach((t) => {
					if (t === 'null' || t === 'undefined') {
						validations.push('@IsOptional()');
					} else {
						validations.push(`@IsEnum(${t})`);
						this.validationsImports.add('IsEnum');
					}
				});
			}

			if (this.currDepth < this.maxDepth) {
				includeFieldRelated = true;
				if (relationCol) {
					const relationFn = relationCol.functions?.find((f) =>
						[
							'ManyToMany',
							'OneToOne',
							'OneToMany',
							'ManyToOne',
							//TODO: support tree structures
						].includes(f.expression!)
					);

					if (!relationFn) {
						log('Not a relation field');
						continue;
					}

					// dir(relationFn, { depth: null });
					const relationRequired = relationFn.props?.find(
						(p) => p.statement?.replaceAll(' ', '') === 'nullable:false'
					);
					//by default nullable
					if (!relationRequired) {
						if (!field.type?.includes('null')) field.type += '| null';
						fieldNullable = true;
						validations.push('@IsOptional()');
						this.validationsImports.add('IsOptional');
					}

					const relationType = relationFn?.identifiers?.[0].expression as Relationships;
					const relatedClass = relationFn?.arrowFn?.[0]?.identifiers?.[0].expression;
					const fileImport = this.parsedTree.imports?.find(
						(i) =>
							i?.identifiers?.findIndex((id) => id?.expression === relatedClass)! > -1
					) || {
						module: `import { ${relatedClass!} } from '${this.ogFilePath.replaceAll(
							'.ts',
							''
						)}'`,
					};

					if (fileImport) {
						const fileName = fileImport.module?.split('/')?.at(-1)?.replace("'", '');
						if (fileName && this.asts[fileName]) {
							const newFile = new AddDtoCreator(
								this.asts[fileName].sourceFile,
								this.asts,
								this.asts[fileName].fullPath,
								{ currDepth: this.currDepth + 1, maxDepth: 1 }
							);
							const { dtoFilePath, className, entityName } = await newFile.build(
								this.entityName,
								this.fileName
							);

							//change the type to the new created dto
							field.type = field.type?.replace(relatedClass!, className!);
							const childRelPath = relative(dirname(this.ogFilePath), dtoFilePath);
							this.addImport(
								`import { ${className} } from '${childRelPath
									.split(sep)
									.join('/')
									.replaceAll('.ts', '')}';`
							);

							switch (relationType) {
								case 'OneToOne':
									validations.push(
										`@Relation({entity:'${entityName}',type:'${
											relationHasFk ? 'hasOne' : 'belongsToOne'
										}'})`
									);
									break;
								case 'OneToMany':
									validations.push(`@Relation({entity:'${entityName}',type:'hasMany'})`);
									break;
								case 'ManyToOne':
									validations.push(
										`@Relation({entity:'${entityName}',type:'belongsToOne'})`
									);
									break;
								case 'ManyToMany':
							}
							//add proper validations of nested class
							if (field.type?.includes('[]')) {
								validations.push(`@ValidateNested({ each: true })`);
							} else {
								validations.push(`@ValidateNested()`);
							}
							validations.push(`@Type(() => ${className})`);
							this.validationsImports.add('ValidateNested');
							this.transformationsImports.add('Type');

							//handle different types of relationships
						} else {
							error(`No ast available for ${fileName}`);
						}
					} else {
						log(this.ogFilePath);
						warn(`Import of class ${relatedClass} is not found`);
					}
				}
			} else {
				includeFieldRelated = false;
			}

			if (!fieldPrimitive && includeFieldRelated === false) continue;

			fieldText += validations.join('\n') + '\n';
			fieldText += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
			fieldsStringified.push(fieldText);
		}
		this.properties.push(...fieldsStringified);
	}
}
