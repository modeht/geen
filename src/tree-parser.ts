import ts from 'typescript';

export function parseTreeV2(accu: any, node: ts.Node) {
	const key = ts.SyntaxKind[node.kind];
	const value = node.getText();
	const children = [];
	const curr = {
		[key]: value,
		children,
	};
	if (Array.isArray(accu)) {
		accu.push(curr);
	} else {
		accu[key] = {
			value,
			children,
		};
	}
	node.forEachChild((child) => parseTreeV2(children, child));
}
