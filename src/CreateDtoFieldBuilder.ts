import { error, log, warn } from 'console';
import { CreateDtoCreator, Relationships } from './DtoCreator';
import { Node } from './TreeParser';
import { dirname, relative, sep } from 'path';

export class CreateDtoFieldBuilder {
	constructor(public addDtoCreator: CreateDtoCreator) {}

	defaultExcludedFields: string[] = [
		'updatedAt',
		'createdAt',
		'updated_at',
		'created_at',
	];

	async _parseFields() {
		const fields = this.addDtoCreator.entityClass?.properties || [];
		const fieldsStringified: string[] = [];

		for (const field of fields) {
			if (this.defaultExcludedFields.includes(field.name!)) continue;

			let fieldAsString = '';
			let fieldNullable = false;
			let fieldEnum = false;
			let fieldNotSupported = false;
			let includeFieldRelated: boolean | null = null;
			let fieldPrimitive = true;
			let fieldValidations: Set<string> = new Set();
			const types = field.type?.split('|').map((t) => t.trim()) || [];

			//leave id for nested because it might be used
			if (['id'].includes(field.name!) && this.addDtoCreator.currDepth === 0) continue;

			for (const type of types) {
				if (type === 'null' || type === 'undefined') {
					fieldValidations.add('@IsOptional()');
					this.addDtoCreator.validationsImports.add('IsOptional');
					fieldNullable = true;
				} else if (type === 'string') {
					fieldValidations.add('@IsString()');
					this.addDtoCreator.validationsImports.add('IsString');
				} else if (type === 'string[]') {
					fieldValidations.add('@IsString({each:true})');
					this.addDtoCreator.validationsImports.add('IsString');
				} else if (type === 'number') {
					fieldValidations.add('@IsNumber()');
					this.addDtoCreator.validationsImports.add('IsNumber');
				} else if (type === 'number[]') {
					fieldValidations.add('@IsNumber({},{each:true})');
					this.addDtoCreator.validationsImports.add('IsNumber');
				} else if (type === 'Date') {
					fieldValidations.add('@IsDate()');
					fieldValidations.add('@Type(()=>Date)');
					this.addDtoCreator.validationsImports.add('IsDate');
					this.addDtoCreator.transformationsImports.add('Type');
				} else if (type === 'boolean') {
					fieldValidations.add('@IsBoolean()');
					this.addDtoCreator.validationsImports.add('IsBoolean');
				} else {
					fieldPrimitive = false;
				}
			}

			if (field.name === 'id') {
				if (!field.type?.includes('null')) field.type += '| null';
				fieldValidations.add(`@IsOptional()`);
				this.addDtoCreator.validationsImports.add('IsOptional');
				fieldNullable = true;
			} else if (field.name !== 'id' && this.addDtoCreator.currDepth > 0) {
				if (!fieldNullable) {
					fieldNullable = true;
					if (!field.type?.includes('null')) field.type += '| null';
					fieldValidations.add(`@IsOptionalIf((obj,_)=>!!obj.id)`);
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
					if (t?.trim() === 'null' || t?.trim() === 'undefined') {
						fieldValidations.add('@IsOptional()');
					} else {
						fieldValidations.add(`@IsEnum(${t})`);
						this.addDtoCreator.validationsImports.add('IsEnum');
					}
				});
			}

			if (this.addDtoCreator.currDepth < this.addDtoCreator.maxDepth) {
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

					//by default nullable
					const isRelRequired = relationFn.props?.find(
						(p) => p.statement?.replaceAll(' ', '') === 'nullable:false'
					);
					if (!isRelRequired) {
						if (!field.type?.includes('null')) field.type += '| null';
						fieldNullable = true;
						fieldValidations.add('@IsOptional()');
						this.addDtoCreator.validationsImports.add('IsOptional');
					}

					const relationType = relationFn?.identifiers?.[0].expression as Relationships;
					const relatedClass = relationFn?.arrowFn?.[0]?.identifiers?.[0].expression;
					const fileImport = this.addDtoCreator.parsedTree.imports?.find(
						(i) =>
							i?.identifiers?.findIndex((id) => id?.expression === relatedClass)! > -1
					) || {
						module: `import { ${relatedClass!} } from '${this.addDtoCreator.ogFilePath.replaceAll(
							'.ts',
							''
						)}'`,
					};

					if (fileImport) {
						const fileName = fileImport.module?.split('/')?.at(-1)?.replace("'", '');
						if (fileName && this.addDtoCreator.asts[fileName]) {
							const newFile = new CreateDtoCreator(
								this.addDtoCreator.asts[fileName].sourceFile,
								this.addDtoCreator.asts[fileName].fullPath,
								this.addDtoCreator.asts,
								{ currDepth: this.addDtoCreator.currDepth + 1, maxDepth: 1 }
							);
							const { dtoFilePath, className, entityName } = await newFile.build(
								this.addDtoCreator.entityName,
								this.addDtoCreator.fileName
							);

							//change the type to the new created dto not the original entity.
							field.type = field.type?.replace(relatedClass!, className!);
							const childRelPath = relative(this.addDtoCreator.ogFilePath, dtoFilePath)
								.split(sep)
								.join('/')
								.replaceAll('.ts', '');

							this.addDtoCreator.imports.add(
								`import { ${className} } from '${childRelPath}';`
							);

							switch (relationType) {
								case 'OneToOne':
									fieldValidations.add(
										`@Relation({entity:'${entityName}',type:'${
											relationHasFk ? 'hasOne' : 'belongsToOne'
										}'})`
									);
									break;
								case 'OneToMany':
									fieldValidations.add(
										`@Relation({entity:'${entityName}',type:'hasMany'})`
									);
									break;
								case 'ManyToOne':
									fieldValidations.add(
										`@Relation({entity:'${entityName}',type:'belongsToOne'})`
									);
									break;
								case 'ManyToMany':
									fieldValidations.add(
										`@Relation({entity:'${entityName}',type:'belongsToMany'})`
									);
									break;
							}

							//add proper validations of nested class
							if (field.type?.includes('[]')) {
								fieldValidations.add(`@ValidateNested({ each: true })`);
								fieldValidations.add(`@IsArray()`);
								this.addDtoCreator.validationsImports.add('IsArray');
							} else {
								fieldValidations.add(`@ValidateNested()`);
							}
							fieldValidations.add(`@Type(() => ${className})`);
							this.addDtoCreator.validationsImports.add('ValidateNested');
							this.addDtoCreator.transformationsImports.add('Type');

							//handle different types of relationships
						} else {
							error(
								`No ast available for ${fileName}. this will result in broken generation, it shouldn't happen`
							);
						}
					} else {
						warn(`Import of class ${relatedClass} is not found`);
					}
				}
			} else {
				includeFieldRelated = false;
			}

			if (!fieldPrimitive && includeFieldRelated === false) continue;

			fieldAsString += Array.from(fieldValidations).join('\n') + '\n';
			fieldAsString += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
			fieldsStringified.push(fieldAsString);
		}
		this.addDtoCreator.properties.push(...fieldsStringified);
	}
}
