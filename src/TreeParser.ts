import ts from 'typescript';

export type Node = {
	module?: string;
	text?: string;
	name?: string;
	type?: string;
	optional?: boolean;
	expression?: string;
	statement?: string;
	def?: string;
	imports?: Node[];
	classes?: Node[];
	properties?: Node[];
	decorators?: Node[];
	identifiers?: Node[];
	functions?: Node[];
	arrowFn?: Node[];
	props?: Node[];
	enums?: Node[];
};

export class TreeParser {
	static parse(ast: ts.SourceFile) {
		let start: Node = {};
		const visit = (prev: Node, node: ts.Node) => {
			let curr = prev;
			if (ts.isImportDeclaration(node)) {
				curr = {
					module: node?.moduleSpecifier?.getText(),
					text: node?.getText(),
				};
				prev.imports = [...(prev.imports || []), curr];
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
			} else if (ts.isQuestionToken(node)) {
				prev['optional'] = true;
			}

			node.forEachChild((child) => visit(curr, child));
		};
		visit(start, ast);
		return start;
	}
}
