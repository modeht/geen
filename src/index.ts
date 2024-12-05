#!/usr/bin/env node
import glob from 'fast-glob';
import { parseFiles } from './file-parser.js';
import { time, timeEnd } from 'console';
import { prereq } from './prereq.js';
import { ModuleCreator } from './ModuleCreator.js';
import { Command } from 'commander';

const program = new Command();

program
	.option('-t')
	.option('-c')
	.action((...args) => {
		// console.log(args);
		// console.log(process.cwd());
		main();
	});

program.parse();

async function main() {
	time('Loading entities');
	const allEntities = await glob.async('**/*/*.entity.ts', {
		absolute: true,
		onlyFiles: true,
		ignore: ['**/node_modules'],
	});
	timeEnd('Loading entities');

	time('Parsing');
	const ASTs = await parseFiles(allEntities);
	timeEnd('Parsing');

	time('Prerequistes');
	await prereq();
	timeEnd('Prerequistes');

	time('Creating modules');
	for (const ast in ASTs) {
		const m = new ModuleCreator(ASTs[ast].fullPath, ASTs[ast].sourceFile, ASTs);
		await m.build();
	}
	timeEnd('Creating modules');
}
