import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { dir, error, log, warn } from 'console';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { DtoFieldBuilder } from './DtoFieldBuilder';

export type TypeKeywords = 'One' | 'Many';
export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class AddDtoCreator {
	parsedTree: Node;
	className: string | undefined;
	entityName: string | undefined;
	entityClass: Node | undefined;
	fileName: string | undefined;
	imports: Set<string> = new Set();
	absoluteImports: { absPath: string; importedFields: string[] }[] = [];
	enums: string[] = [];
	properties: string[] = [];
	ogFilePath: string;
	maxDepth: number = 1;
	currDepth: number = 0;
	validationsImports: Set<string> = new Set();
	transformationsImports: Set<string> = new Set();
	asts: ASTs;
	dtoFieldBuilder: DtoFieldBuilder;

	constructor(
		ast: ts.SourceFile,
		asts: ASTs,
		ogPath: string,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 }
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.ogFilePath = ogPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
		this.asts = asts;
		this.dtoFieldBuilder = new DtoFieldBuilder(this);
	}

	async build(parenClassName: string = '', parentFileName: string = '') {
		await mkdir(join(dirname(this.ogFilePath), '../generated-dtos'), { recursive: true });
		this._setEntityName();
		this._setClassName(parenClassName);
		this._setFilename();
		this._setDefaultImports();
		this._setEnums();
		await this.dtoFieldBuilder._setFields();

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

		await writeFile(dtoFilePath, dtoTemplate);
		return { dtoFilePath, className: this.className, entityName: this.entityName };
	}

	_setEntityName() {
		const entityClass = this.parsedTree.classes?.find((c) =>
			c.decorators?.find((d) => d.text?.startsWith('@Entity'))
		);
		if (!entityClass) throw new Error('no entity class found');
		this.entityName = entityClass.name!;
		this.entityClass = entityClass;
	}

	_setClassName(customName?: string) {
		this.className = `Add${(customName ?? '') + this.entityName}Dto`;
	}

	_setFilename() {
		this.fileName = this.entityName
			?.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();
	}

	_setDefaultImports() {
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

	_setEnums() {
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

	addImport(importStr: string) {
		this.imports.add(importStr);
	}

	getParsedTree() {
		return this.parsedTree;
	}
}
