import ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { dir, log } from 'console';
import { async, sync } from 'fast-glob';

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

const allEntities = sync('**/*/*.entity.ts', {});

const file = readTsFile(join(process.cwd(), allEntities[0]));
//TODO get all entities
//parse all of them and store the parsed trees in a global object
//by the file name

const ast = parseTsFile(file);

function parseTree(ast) {
	let start = {};
	const visit = (prev, node: ts.Node) => {
		let curr = prev;
		if (ts.isImportDeclaration(node)) {
			curr = {
				module: node?.moduleSpecifier?.getText(),
				fullText: node?.getText(),
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
		} else if (ts.isEnumDeclaration(node)) {
			curr = {
				fullText: node?.getText(),
			};
			prev['enums'] = [...(prev['enums'] || []), curr];
		}
		node.forEachChild((child) => visit(curr, child));
	};
	visit(start, ast);
	return start;
}
const fileRep = parseTree(ast);
// dir(fileRep, { depth: null });

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
		.map((i) => i.fullText);
	imports.push('import * as v from "class-validator";');
	imports.push('import * as t from "class-transformer";');

	//handle enums
	//i am not sure what to do here yet. simple solution is just include it in file
	//but can order here be a problem
	const enums = file.enums.map((i) => i.fullText);

	//handle properties fields
	const fields = createFieldsWithValidations(entityClass.properties);

	try {
		let dtoTemplate = await readFile(
			join(process.cwd(), 'templates/dto.template.txt'),
			'utf8'
		);
		dtoTemplate = dtoTemplate.replace('<<imports>>', imports.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<enums>>', enums.join('\n'));
		dtoTemplate = dtoTemplate.replace('<<dtoClass>>', dtoClassName);
		dtoTemplate = dtoTemplate.replace('<<properties>>', fields.join('\n\n'));
		await writeFile(join(process.cwd(), 'dtos/test.dto.ts'), dtoTemplate);
	} catch (error) {
		console.error(error);
	}
}

createAddDto(fileRep);

type Field = {
	name: string;
	type: string;
	decorators: Decorator[];
};

type Decorator = {
	fullText: string;
	functions: any[];
};

function createFieldsWithValidations(fields: Field[], { includeRelations = true } = {}) {
	const fieldsStringified: string[] = [];
	for (const field of fields) {
		if (field.name === 'id') continue;
		let fieldText = '';
		let fieldNullable = false;
		const validations: string[] = [];
		const types = field.type?.split('|').map((t) => t.trim());

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
				//enum or class
				fieldEnumOrClass = type;
				//i need to know i need to include the enum?
				//create new file for it
				//
			}
		}

		const decorators = field.decorators?.map((d) => d.fullText);
		for (const deco of decorators) {
			//normalize quotes
			deco.replace('"', "'");

			//handle enums
			if (deco.startsWith('@Column') && deco.includes('enum')) {
				//includes 'enum'
				//validate it is in IMPORTS
				//TODO think about the import or the enum definition
				if (fieldEnumOrClass) validations.push(`@IsEnum(${fieldEnumOrClass})`);
			}

			//TODO need to think about how to handle relation ship
			//initial thought is taking the name and getting the import file
			//get the file info somehow
			//
			//handle relations
			if (deco.startsWith('@OneToOne')) {
			}
			if (deco.startsWith('@OneToMany')) {
			}
			if (deco.startsWith('@ManyToOne')) {
			}
			if (deco.startsWith('@ManyToMany')) {
			}
		}

		fieldText += validations.join('\n') + '\n';
		fieldText += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
		fieldsStringified.push(fieldText);
	}
	return fieldsStringified;
}
