import ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { dir, log, warn } from 'console';
import { async, sync } from 'fast-glob';
import { randomBytes } from 'crypto';

(async () => {
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
	async function parseFiles(entries: string[]): Promise<Record<string, any>> {
		const filesContent = await Promise.all(
			entries.map((e) => readFile(join(process.cwd(), e), 'utf8'))
		);

		const parsedFiles = filesContent.map((f) =>
			ts.createSourceFile(randomBytes(2).toString('hex'), f, ts.ScriptTarget.ESNext, true)
		);

		const r = {};
		for (let i = 0; i < entries.length; i++) {
			const key = entries[i].split('/').at(-1)?.replace('.ts', '');
			if (key) r[key] = parsedFiles[i];
		}
		return r;
	}
	//TODO get all entities
	//parse all of them and store the parsed trees in a global object
	//by the file name

	const ASTs = await parseFiles(allEntities);
	// console.log(Object.keys(ASTs));
	const testAst = Object.values(ASTs)[0];

	function parseTree(ast) {
		let start = {};
		const visit = (prev, node: ts.Node) => {
			let curr = prev;
			if (ts.isImportDeclaration(node)) {
				curr = {
					module: node?.moduleSpecifier?.getText(),
					text: node?.getText(),
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
					text: node?.getText(),
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
					text: node?.getText(),
				};
				prev['enums'] = [...(prev['enums'] || []), curr];
			}
			node.forEachChild((child) => visit(curr, child));
		};
		visit(start, ast);
		return start;
	}

	const fileRep = parseTree(testAst);
	// dir(fileRep, { depth: null });

	async function createAddDto(
		file: Record<string, any>,
		{ maxDepth = 1, currDepth = 0 } = { currDepth: 0, maxDepth: 1 }
	) {
		const entityClass = file.classes?.find((c) =>
			c.decorators.find((d) => d.text.startsWith('@Entity'))
		);
		if (!entityClass) return;

		const entityName = entityClass.name;
		const dtoFileName = entityClass.name
			.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();
		const dtoClassName = `Add${entityName}Dto`;

		//handle imports
		const imports: string[] = file.imports
			?.filter((i) => i.module.startsWith("'."))
			.map((i) => i.text);
		imports.push('import * as v from "class-validator";');
		imports.push('import * as t from "class-transformer";');

		//handle enums
		//i am not sure what to do here yet. simple solution is just include it in file
		//but can order here be a problem
		//TODO i need to check if it is exported or not if yes i can just use the export?
		const enums = file.enums?.map((i) => i.text) || [];

		//handle properties fields
		const fields = createFieldsWithValidations(entityClass.properties, file.imports, {
			currDepth,
			maxDepth,
		});

		try {
			let dtoTemplate = await readFile(
				join(process.cwd(), 'templates/dto.template'),
				'utf8'
			);
			dtoTemplate = dtoTemplate.replace('<<imports>>', imports.join('\n'));
			dtoTemplate = dtoTemplate.replace('<<enums>>', enums.join('\n'));
			dtoTemplate = dtoTemplate.replace('<<dtoClass>>', dtoClassName);
			dtoTemplate = dtoTemplate.replace('<<properties>>', fields.join('\n\n'));
			await writeFile(join(process.cwd(), `dtos/add-${dtoFileName}.dto.ts`), dtoTemplate);
		} catch (error) {
			//TODO handle errors
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
		text: string;
		functions: any[];
	};

	function createFieldsWithValidations(
		fields: Field[],
		imports: any[],
		{ currDepth, maxDepth } = { currDepth: 0, maxDepth: 1 }
	) {
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

			const decorators = field.decorators;
			for (const deco of decorators) {
				//normalize quotes
				deco.text.replace('"', "'");

				//handle enums
				if (deco.text.startsWith('@Column') && deco.text.includes('enum')) {
					//includes 'enum'
					//validate it is in IMPORTS
					//TODO think about the import or the enum definition
					if (fieldEnumOrClass) validations.push(`@IsEnum(${fieldEnumOrClass})`);
				}

				//TODO need to think about how to handle relation ship
				//initial thought is taking the name and getting the import file
				//get the file info somehow
				//
				if (currDepth < maxDepth) {
					//handle relations
					if (deco.text.startsWith('@OneToOne')) {
					}
					if (deco.text.startsWith('@OneToMany')) {
					}
					if (deco.text.startsWith('@ManyToOne')) {
						//find related class name
						//find its filename
						//get its tree from the global asts
						//parse it with one level deep
						const mtmDeco = deco.functions.find((f) => f.expression === 'ManyToOne');
						const relatedClass = mtmDeco.arrowFn[0].identifiers[0].expression;
						const fileImport = imports.find(
							(i) => i.identifiers.findIndex((id) => id.expression === relatedClass) > -1
						);
						if (fileImport) {
							const filename = fileImport.module.split('/').at(-1).replace("'", '');
							if (ASTs[filename]) {
								const classAst = parseTree(ASTs[filename]);
								createAddDto(classAst, { maxDepth: 1, currDepth: 0 });
								//add the import to the main file
							} else {
								warn(`No ast available for ${filename}`);
							}
						} else {
							warn(`Import of class ${relatedClass} is not found`);
						}
					}
					if (deco.text.startsWith('@ManyToMany')) {
					}
				}
			}

			fieldText += validations.join('\n') + '\n';
			fieldText += `${field.name}${fieldNullable ? '?' : ''}: ${field.type};`;
			fieldsStringified.push(fieldText);
		}
		return fieldsStringified;
	}
})();
