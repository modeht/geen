import ts from 'typescript';

export type ASTs = Record<string, { fullPath: string; sourceFile: ts.SourceFile }>;

export type RelationDecoratorParams = {
	entity: string;
	type: string;
};
