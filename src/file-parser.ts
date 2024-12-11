import { readFile } from 'fs/promises';
import { ASTs } from './lib/types/index.js';
import { join, resolve, sep } from 'path';
import ts from 'typescript';
import { randomBytes } from 'crypto';

export async function parseFiles(entries: string[]): Promise<ASTs> {
	const filesContent = await Promise.all(entries.map((e) => readFile(resolve(e), 'utf8')));

	const parsedFiles = filesContent.map((f) =>
		ts.createSourceFile(randomBytes(2).toString('hex'), f, ts.ScriptTarget.ESNext, true)
	);

	const r = {};
	for (let i = 0; i < entries.length; i++) {
		let key = getEntityName(entries[i]);

		if (key)
			r[key] = {
				fullPath: entries[i],
				sourceFile: parsedFiles[i],
			};
	}
	return r;
}

export function getEntityName(path: string) {
	path = path.replaceAll(sep, '/');
	return path.split('/').at(-1)?.replace('.ts', '');
}
