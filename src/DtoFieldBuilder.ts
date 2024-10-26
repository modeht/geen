import { error, log, warn } from 'console';
import { AddDtoCreator, Relationships } from './AddDtoCreator';
import { Node } from './TreeParser';
import { dirname, relative, sep } from 'path';

export class DtoFieldBuilder {
	constructor(public addDtoCreator: AddDtoCreator) {}

	defaultExcludedFields: string[] = [
		'updatedAt',
		'createdAt',
		'updated_at',
		'created_at',
	];

	async _setFields() {
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
			let fieldValidations: string[] = [];
			const types = field.type?.split('|').map((t) => t.trim()) || [];

			//leave id for nested because it might be used
			if (['id'].includes(field.name!) && this.addDtoCreator.currDepth === 0) continue;

			for (const type of types) {
				if (type === 'null' || type === 'undefined') {
					fieldValidations.push('@IsOptional()');
					this.addDtoCreator.validationsImports.add('IsOptional');
					fieldNullable = true;
				} else if (type === 'string') {
					fieldValidations.push('@IsString()');
					this.addDtoCreator.validationsImports.add('IsString');
				} else if (type === 'string[]') {
					fieldValidations.push('@IsString({each:true})');
					this.addDtoCreator.validationsImports.add('IsString');
				} else if (type === 'number') {
					fieldValidations.push('@IsNumber()');
					this.addDtoCreator.validationsImports.add('IsNumber');
				} else if (type === 'number[]') {
					fieldValidations.push('@IsNumber({},{each:true})');
					this.addDtoCreator.validationsImports.add('IsNumber');
				} else if (type === 'Date') {
					fieldValidations.push('@IsDate()');
					fieldValidations.push('@Type(()=>Date)');
					this.addDtoCreator.validationsImports.add('IsDate');
					this.addDtoCreator.transformationsImports.add('Type');
				} else if (type === 'boolean') {
					fieldValidations.push('@IsBoolean()');
					this.addDtoCreator.validationsImports.add('IsBoolean');
				} else {
					fieldPrimitive = false;
				}
			}

			if (field.name === 'id') {
				if (!field.type?.includes('null')) field.type += '| null';
				fieldValidations.push(`@IsOptional()`);
				this.addDtoCreator.validationsImports.add('IsOptional');
				fieldNullable = true;
			} else if (field.name !== 'id' && this.addDtoCreator.currDepth > 0) {
				if (!fieldNullable) {
					if (!field.type?.includes('null')) field.type += '| null';
					fieldNullable = true;
					fieldValidations.push(`@IsOptionalIf((obj,_)=>!!obj.id)`);
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
						fieldValidations.push('@IsOptional()');
					} else {
						fieldValidations.push(`@IsEnum(${t})`);
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
						fieldValidations.push('@IsOptional()');
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
							const newFile = new AddDtoCreator(
								this.addDtoCreator.asts[fileName].sourceFile,
								this.addDtoCreator.asts,
								this.addDtoCreator.asts[fileName].fullPath,
								{ currDepth: this.addDtoCreator.currDepth + 1, maxDepth: 1 }
							);
							const { dtoFilePath, className, entityName } = await newFile.build(
								this.addDtoCreator.entityName,
								this.addDtoCreator.fileName
							);

							//change the type to the new created dto
							field.type = field.type?.replace(relatedClass!, className!);
							const childRelPath = relative(
								dirname(this.addDtoCreator.ogFilePath),
								dtoFilePath
							);
							this.addDtoCreator.addImport(
								`import { ${className} } from '${childRelPath
									.split(sep)
									.join('/')
									.replaceAll('.ts', '')}';`
							);

							switch (relationType) {
								case 'OneToOne':
									fieldValidations.push(
										`@Relation({entity:'${entityName}',type:'${
											relationHasFk ? 'hasOne' : 'belongsToOne'
										}'})`
									);
									break;
								case 'OneToMany':
									fieldValidations.push(
										`@Relation({entity:'${entityName}',type:'hasMany'})`
									);
									break;
								case 'ManyToOne':
									fieldValidations.push(
										`@Relation({entity:'${entityName}',type:'belongsToOne'})`
									);
									break;
								case 'ManyToMany':
							}

							//add proper validations of nested class
							if (field.type?.includes('[]')) {
								fieldValidations.push(`@ValidateNested({ each: true })`);
								fieldValidations.push(`@IsArray()`);
								this.addDtoCreator.validationsImports.add('IsArray');
							} else {
								fieldValidations.push(`@ValidateNested()`);
							}
							fieldValidations.push(`@Type(() => ${className})`);
							this.addDtoCreator.validationsImports.add('ValidateNested');
							this.addDtoCreator.transformationsImports.add('Type');

							//handle different types of relationships
						} else {
							error(`No ast available for ${fileName}`);
						}
					} else {
						log(this.addDtoCreator.ogFilePath);
						warn(`Import of class ${relatedClass} is not found`);
					}
				}
			} else {
				includeFieldRelated = false;
			}

			if (!fieldPrimitive && includeFieldRelated === false) continue;

			fieldAsString += fieldValidations.join('\n') + '\n';
			fieldAsString += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
			fieldsStringified.push(fieldAsString);
		}
		this.addDtoCreator.properties.push(...fieldsStringified);
	}
}
