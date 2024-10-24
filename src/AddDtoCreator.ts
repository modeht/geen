import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { dir, log, warn } from 'console';
import { DepthManager } from './DepthManager';
import { readFile, writeFile, mkdir, rmdir } from 'fs/promises';
import path, { dirname, join, normalize, relative, resolve, sep } from 'path';
import { ASTs } from './lib/types';

export class AddDtoCreator {
	private parsedTree: Node;
	private className: string | undefined;
	private entityName: string | undefined;
	private entityClass: Node | undefined;
	private fileName: string | undefined;
	private imports: string[] = [];
	private absoluteImports: { absPath: string; importedFields: string[] }[] = [];
	private enums: string[] = [];
	private properties: string[] = [];
	private ogFilePath: string;
	private maxDepth: number = 1;
	private validationsImports: Set<string> = new Set();
	private transformationsImports: Set<string> = new Set();

	constructor(
		ast: ts.SourceFile,
		private asts: ASTs,
		ogPath: string,
		{ maxDepth } = { maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.ogFilePath = ogPath;
		this.maxDepth = maxDepth;
	}

	async build(parentFileName: string = '') {
		await mkdir(join(dirname(this.ogFilePath), '../generated-dtos'), { recursive: true });
		this._setEntityName();
		this._setClassName();
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

		this.imports = [
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
		];

		let dtoTemplate = await readFile(
			join(process.cwd(), 'templates/dto.template'),
			'utf8'
		);
		dtoTemplate = dtoTemplate.replace('<<imports>>', this.imports.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<enums>>', this.enums.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<dtoClass>>', this.className!);
		dtoTemplate = dtoTemplate.replace('<<properties>>', this.properties.join('\n\n'));
		dtoTemplate = dtoTemplate.replace(
			'<<validationsImports>>',
			Array.from(this.validationsImports).join(', ')
		);
		dtoTemplate = dtoTemplate.replace(
			'<<transformationsImports>>',
			Array.from(this.transformationsImports).join(', ')
		);
		dtoTemplate = dtoTemplate.replace(
			'<<pathToOriginal>>',
			ogFileDirPath.split(sep).join('/').replaceAll('.ts', '')
		);

		await writeFile(dtoFilePath, dtoTemplate);
		return { dtoFilePath, className: this.className };
	}

	private _setEntityName() {
		const entityClass = this.parsedTree.classes?.find((c) =>
			c.decorators?.find((d) => d.text?.startsWith('@Entity'))
		);
		if (!entityClass) throw new Error('no entity class found');
		this.entityName = entityClass.name!;
		this.entityClass = entityClass;
	}

	private _setClassName() {
		this.className = `Add${this.entityName}Dto`;
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
			} else {
				this.imports.push(i.text?.replaceAll('.ts', '')!);
			}
		});
		//validation lib
		this.imports?.push('import { <<validationsImports>> } from "class-validator";');
		this.imports?.push('import { <<transformationsImports>> } from "class-transformer";');
	}

	private _setEnums() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//make an import statement
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					const importStmnt = `import { ${enumKey} } from '<<pathToOriginal>>'`;
					this.imports.push(importStmnt);
				}
			} else {
				this.enums.push(e.text!);
			}
		});
	}

	private addImport(importStr: string) {
		this.imports.push(importStr);
	}

	getParsedTree() {
		return this.parsedTree;
	}

	private async _setFields() {
		const fields = this.entityClass?.properties || [];
		const fieldsStringified: string[] = [];

		for (const field of fields) {
			if (
				['id', 'updatedAt', 'createdAt', 'updated_at', 'created_at'].includes(field.name!)
			)
				continue;

			let fieldText = '';
			let fieldNullable = false;
			let fieldEnum = false;
			let includeFieldRelated: boolean | null = null;
			let fieldPrimitive = true;
			const validations: string[] = [];
			const types = field.type?.split('|').map((t) => t.trim()) || [];

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
			const enums: Node[] = [];
			const relationships: Node[] = [];

			field.decorators?.forEach((d) => {
				if (d.text?.startsWith('@Column') && d.text?.includes('enum')) {
					enums.push(d);
				} else if (d.text?.match(/(One|Many)To(One|Many)/)?.length) {
					relationships.push(d);
				}
			});

			enums?.forEach((e) => {
				fieldEnum = true;
				field.type?.split('|').forEach((t) => {
					if (t === 'null' || t === 'undefined') {
						validations.push('@IsOptional()');
					} else {
						validations.push(`@IsEnum(${t})`);
						this.validationsImports.add('IsEnum');
					}
				});
			});

			if (DepthManager.currDepth < this.maxDepth) {
				for (const rel of relationships) {
					includeFieldRelated = true;
					const relFn = rel.functions?.find((f) =>
						['ManyToMany', 'OneToOne', 'OneToMany', 'ManyToOne'].includes(f.expression!)
					);

					if (!relFn) {
						log('Not a relation field');
						continue;
					}

					const relatedClass = relFn?.arrowFn?.[0]?.identifiers?.[0].expression;

					const fileImport = this.parsedTree.imports?.find(
						(i) =>
							i?.identifiers?.findIndex((id) => id?.expression === relatedClass)! > -1
					);

					if (fileImport) {
						const fileName = fileImport.module?.split('/')?.at(-1)?.replace("'", '');
						if (fileName && this.asts[fileName]) {
							const newFile = new AddDtoCreator(
								this.asts[fileName].sourceFile,
								this.asts,
								this.asts[fileName].fullPath
							);

							DepthManager.currDepth++;
							const { dtoFilePath, className } = await newFile.build(this.fileName);
							field.type = field.type?.replace(relatedClass!, className!);
							const childRelPath = relative(dirname(this.ogFilePath), dtoFilePath);
							this.addImport(
								`import { ${className} } from '${childRelPath
									.split(sep)
									.join('/')
									.replaceAll('.ts', '')}';`
							);
						} else {
							warn(`No ast available for ${fileName}`);
						}
					} else {
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
