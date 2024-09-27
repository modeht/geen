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

const classes: Record<any, any> = {};
const visit = (node: ts.Node): void => {
	if (ts.isClassDeclaration(node)) {
		// if (node.name?.text) classes[node?.name?.text] = node;
		console.log('class', node?.name?.getText());
	}
	if (ts.isDecorator(node)) {
		// console.log('deco', node?.getText());
	}
	if (ts.isPropertyDeclaration(node)) {
		console.log(ts.getDecorators(node)?.map((i) => i.getText()));
		console.log(node.name?.getText());
		// console.log('property', node?.getText());
	}

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
