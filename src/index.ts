import ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { dir, log } from 'console';

function readTsFile(path: string) {
	return readFileSync(path, 'utf8');
}

function parseTsFile(file: string): ts.SourceFile {
	const sourceFile = ts.createSourceFile('temp.ts', file, ts.ScriptTarget.ESNext, true);
	return sourceFile;
}

function getKindLabel(n: number) {
	return Object.entries(ts.SyntaxKind).find(([k, v]) => v === n);
}

const file = readTsFile(join(process.cwd(), 'entities', 'category.entity.ts'));
const ast = parseTsFile(file);

function parseTree(ast) {
	let start = {};
	const visit = (prev, node: ts.Node) => {
		let curr = prev;
		if (ts.isImportDeclaration(node)) {
			curr = {
				module: node?.moduleSpecifier?.getText(),
				fullText: node?.getFullText(),
			};
			prev['imports'] = [...(prev['imports'] || []), curr];
		} else if (ts.isClassDeclaration(node)) {
			curr = {
				name: node?.name?.getText(),
			};
			prev['classes'] = [...(prev['classes'] || []), curr];
		} else if (ts.isPropertyDeclaration(node)) {
			curr = {
				name: node?.name?.getText(),
				type: node?.type?.getText(),
			};
			prev['properties'] = [...(prev['properties'] || []), curr];
		} else if (ts.isDecorator(node)) {
			curr = {
				fullText: node?.getText(),
			};
			prev['decorators'] = [...(prev['decorators'] || []), curr];
		} else if (ts.isIdentifier(node)) {
			curr = {
				expression: node?.getText(),
			};
			prev['identifiers'] = [...(prev['identifiers'] || []), curr];
		} else if (ts.isCallExpression(node)) {
			curr = {
				expression: node?.expression?.getText(),
			};
			prev['functions'] = [...(prev['functions'] || []), curr];
		} else if (ts.isArrowFunction(node)) {
			curr = {
				def: node?.getText(),
			};
			prev['arrowFn'] = [...(prev['arrowFn'] || []), curr];
		} else if (ts.isPropertyAssignment(node)) {
			curr = {
				statement: node?.getText(),
			};
			prev['props'] = [...(prev['props'] || []), curr];
		}
		node.forEachChild((child) => visit(curr, child));
	};
	visit(start, ast);
	return start;
}
const fileRep = parseTree(ast);
dir(fileRep, { depth: null });

async function createAddDto(file: Record<string, any>, depth = 3, iterator = 1) {
	const entityClass = file.classes?.find((c) =>
		c.decorators.find((d) => d.fullText.startsWith('@Entity'))
	);
	if (!entityClass) return;

	const entityName = entityClass.name;
	const dtoClassName = `Add${entityName}Dto`;

	//handle imports
	const imports: string[] = file.imports
		?.filter((i) => i.module.startsWith("'."))
		.map((i) => i.fullText.trim().replace('\n', ''));
	imports.push('import * as v from "class-validator";');
	imports.push('import * as t from "class-transformer";');

	//handle properties fields
	const fields = createFieldsWithValidations(entityClass.properties);

	try {
		let dtoTemplate = await readFile(
			join(process.cwd(), 'templates/dto.template.txt'),
			'utf8'
		);
		dtoTemplate = dtoTemplate.replace('<<dtoClass>>', dtoClassName);
		dtoTemplate = dtoTemplate.replace('<<properties>>', fields.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<imports>>', imports.join('\n'));
		await writeFile(join(process.cwd(), 'dtos/test.dto.ts'), dtoTemplate);
	} catch (error) {
		console.error(error);
	}
}

// createAddDto(fileRep);

type Field = {
	name: string;
	type: string;
	decorators: Decorator[];
};

type Decorator = {
	fullText: string;
	functions: any[];
};

function createFieldsWithValidations(fields: Field[], { includeRelations = true }) {
	const fieldsStringified: string[] = [];
	for (const field of fields) {
		if (field.name === 'id') continue;
		let fieldText = '';
		let fieldNullable = false;
		const validations: string[] = [];
		const types = field.type?.split('|').map((t) => t.trim());
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
			}
			if (!includeRelations) continue;
			//handle enums
			//handle relationships
		}

		const decorators = field.decorators?.map((d) => d.fullText);
		for (const deco of decorators) {
		}

		fieldText += validations.join('\n') + '\n';
		fieldText += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
		fieldsStringified.push(fieldText);
	}
	return fieldsStringified;
}
