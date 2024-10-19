import { sync } from 'fast-glob';
import { ASTs } from './lib/types';
import { readFile } from 'fs/promises';
import { join } from 'path';
import ts from 'typescript';
import { randomBytes } from 'crypto';
import { AddDtoCreator } from './AddDtoCreator';
import { DepthManager } from './DepthManager';

(async () => {
	const allEntities = sync('**/*/*.entity.ts', {});

	async function parseFiles(entries: string[]): Promise<ASTs> {
		const filesContent = await Promise.all(
			entries.map((e) => readFile(join(process.cwd(), e), 'utf8'))
		);

		const parsedFiles = filesContent.map((f) =>
			ts.createSourceFile(randomBytes(2).toString('hex'), f, ts.ScriptTarget.ESNext, true)
		);

		const r = {};
		for (let i = 0; i < entries.length; i++) {
			const key = entries[i].split('/').at(-1)?.replace('.ts', '');
			if (key)
				r[key] = {
					fullPath: entries[i],
					sourceFile: parsedFiles[i],
				};
		}
		return r;
	}

	const ASTs = await parseFiles(allEntities);

	const testAst = Object.values(ASTs)[0];
	DepthManager.currDepth = 0;
	const addDtoCreator = new AddDtoCreator(testAst.sourceFile, ASTs, testAst.fullPath, {
		maxDepth: 1,
	});
	const r = await addDtoCreator.build();
	console.log(r);
	DepthManager.currDepth = 0;
})();
