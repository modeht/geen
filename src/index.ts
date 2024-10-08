import ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';

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

const r: Record<string, any> = {};
const visit = (prev: any, node: ts.Node): void => {
	let curr = prev;
	if (ts.isImportDeclaration(node)) {
		curr = {
			module: node?.moduleSpecifier?.getText(),
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
		// if (node?.getText() === "@Entity({\r\n\tname: 'categories',\r\n})") {
		// 	const { parent, ...rest } = node;
		// 	console.dir(rest, { depth: 2 });
		// }
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

visit(r, ast);

console.dir(r, { depth: null });

//get all classes
//find that entity?
// console.log(getKindLabel(80));
