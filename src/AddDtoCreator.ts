import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { warn } from 'console';
import { DepthManager } from './DepthManager';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { ASTs } from './lib/types';

export class AddDtoCreator {
	private parsedTree: Node;
	private className: string | undefined;
	private entityName: string | undefined;
	private entityClass: Node | undefined;
	private fileName: string | undefined;
	private imports: string[] = [];
	private enums: string[] = [];
	private properties: string[] = [];
	private ogFilePath: string;
	private maxDepth: number = 1;

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
		this._setEntityName();
		this._setClassName();
		this._setFilename();
		this._setDefaultImports();
		this._setEnums();
		await this._setFields();

		let dtoTemplate = await readFile(
			join(process.cwd(), 'templates/dto.template'),
			'utf8'
		);
		dtoTemplate = dtoTemplate.replace('<<imports>>', this.imports.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<enums>>', this.enums.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<dtoClass>>', this.className!);
		dtoTemplate = dtoTemplate.replace('<<properties>>', this.properties.join('\n\n'));
		const savedFileName = `add${parentFileName ? '-' + parentFileName : ''}-${
			this.fileName
		}.dto.ts`;
		await writeFile(join(process.cwd(), `dtos/${savedFileName}`), dtoTemplate);
		DepthManager.currDepth++;
		return { fileName: savedFileName, className: this.className };
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
		const imports =
			this.parsedTree.imports
				?.filter((i) => i.module?.startsWith("'."))
				.map((i) => i.text!) || [];
		imports?.push('import * as v from "class-validator";');
		imports?.push('import * as t from "class-transformer";');
		this.imports = imports;
	}

	private _setEnums() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//make an import statement
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					//TODO file path should be dynamic
					const importStmnt = `import { ${enumKey} } from '../../${this.ogFilePath}'`;
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
			if (field.name === 'id') continue;
			let fieldText = '';
			let fieldNullable = false;
			const validations: string[] = [];
			const types = field.type?.split('|').map((t) => t.trim()) || [];

			let fieldEnumOrClass: string | undefined;

			for (const type of types) {
				if (type === 'null' || type === 'undefined') {
					validations.push('@v.IsOptional()');
					fieldNullable = true;
				} else if (type === 'string') {
					validations.push('@v.IsString()');
				} else if (type === 'string[]') {
					validations.push('@v.IsString({each:true})');
				} else if (type === 'number') {
					validations.push('@v.IsNumber()');
				} else if (type === 'number[]') {
					validations.push('@v.IsNumber({},{each:true})');
				} else if (type === 'Date') {
					validations.push('@v.IsDate()\n@t.Type(()=>Date)');
				} else if (type === 'boolean') {
					validations.push('@v.IsBoolean()');
				} else {
					fieldEnumOrClass = type;
				}
			}

			const decorators = field.decorators || [];
			for (const deco of decorators) {
				//normalize quotes
				deco.text?.replace('"', "'");

				//handle enums
				if (deco.text?.startsWith('@Column') && deco.text?.includes('enum')) {
					if (fieldEnumOrClass) validations.push(`@IsEnum(${fieldEnumOrClass})`);
				}

				//handle relations
				console.log(DepthManager.currDepth);
				if (DepthManager.currDepth < this.maxDepth) {
					if (deco.text?.startsWith('@OneToOne')) {
					}
					if (deco.text?.startsWith('@OneToMany')) {
					}
					if (deco.text?.startsWith('@ManyToOne')) {
						const mtmDeco = deco.functions?.find((f) => f.expression === 'ManyToOne');
						const relatedClass = mtmDeco?.arrowFn?.[0]?.identifiers?.[0].expression;
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
								const { fileName: newDtoFileName, className } = await newFile.build(
									this.fileName
								);
								this.addImport(`import { ${className} } from './${newDtoFileName}';`);
							} else {
								warn(`No ast available for ${fileName}`);
							}
						} else {
							warn(`Import of class ${relatedClass} is not found`);
						}
					}
					if (deco.text?.startsWith('@ManyToMany')) {
					}
				}
			}

			fieldText += validations.join('\n') + '\n';
			fieldText += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
			fieldsStringified.push(fieldText);
		}
		this.properties.push(...fieldsStringified);
	}
}
