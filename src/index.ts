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

const file = readTsFile(join(process.cwd(), 'entities', 'category.entity.ts'));
const ast = parseTsFile(file);

const extractDecorators = (ds: readonly ts.Decorator[] | undefined) => {
	if (!ds) return;

	function getExpres(node: ts.Node) {
		// if (ts.isPropertyAccessExpression(node)) {
		// 	console.log(node.getText());
		// }
		if (ts.isFunctionDeclaration(node)) {
			console.log(node.getText());
		}
		if (ts.isFunctionLike(node)) {
			console.log(node.getText());
		}
		// if (ts.isExpression(node)) {
		// 	console.log(node.getText());
		// }

		// if (ts.isFunctionExpression(node)) {
		// 	console.log(node.getText());
		// }
		node.forEachChild(getExpres);
	}

	for (const d of ds) {
		getExpres(d);
	}
};

const visit = (node: ts.Node): void => {
	if (ts.isClassDeclaration(node)) {
		// if (node.name?.text) classes[node?.name?.text] = node;
		console.log('class', node.getText());
	}
	if (ts.isDecorator(node)) {
		console.log('decorator', node?.getText());
	}
	if (ts.isPropertyDeclaration(node)) {
		extractDecorators(ts.getDecorators(node));
		// console.log(node.name?.getText());
		// console.log(node.type?.getText());
		console.log('property', node?.getText());
	}
	// if(ts.i)

	node.forEachChild(visit);
};

visit(ast);

// console.log(classes);

// const findFields = (nodes: ts.Node[]): void => {
// 	for (const node of nodes) {
// 		// node.forEachChild((child) => {
// 		// 	const { parent, ...rest } = child;
// 		// 	console.log(getKindLabel(child.kind));
// 		// 	console.log(child.getText());
// 		// 	console.log(rest);
// 		// });
// 	}
// };

// findFields(Object.values(classes));

// function getKindLabel(n: number) {
// 	return Object.entries(ts.SyntaxKind).find(([k, v]) => v === n);
// }
