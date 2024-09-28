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

// const extractDecorators = (ds: readonly ts.Decorator[] | undefined) => {
// 	if (!ds) return;

// 	function getExpres(dlvl = 1, node: ts.Node) {
// 		if (dlvl > 1) return;
// 		console.log('node text', node.getText());
// 		console.log('kind', getKindLabel(node.kind));
// 		console.log('-------------------------');
// 		dlvl++;
// 		node.forEachChild((...args) => getExpres(dlvl, ...args));
// 	}

// 	for (const d of ds) {
// 		getExpres(1, d);
// 	}
// };

const r: Record<string, any> = {};
const visit = (prev: any, node: ts.Node): void => {
	let curr = prev;
	// console.log(prev);
	if (ts.isImportDeclaration(node)) {
		curr = {
			module: node.moduleSpecifier?.getText(),
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
