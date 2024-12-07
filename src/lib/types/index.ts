import type { SourceFile } from 'typescript';

export type ASTs = Record<string, { fullPath: string; sourceFile: SourceFile; relations?: Record<string, boolean> }>;

export type RelationDecoratorParams = {
	entity: string;
	type: string;
};
