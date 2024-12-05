#!/usr/bin/env node

import { async, sync } from 'fast-glob';
import { parseFiles } from './file-parser';
import { time, timeEnd } from 'console';
import { prereq } from './prereq';
import { ModuleCreator } from './ModuleCreator';
import { Command } from 'commander';

const program = new Command();

program
	.option('-t')
	.option('-c')
	.action((...args) => {
		console.log(args);
		console.log('1');
	});

program.parse();

// async function main() {
// 	time('Loading entities');
// 	const allEntities = await async('**/*/*.entity.ts', { absolute: true, onlyFiles: true, ignore: ['**/node_modules'] });
// 	timeEnd('Loading entities');

// 	time('Parsing');
// 	const ASTs = await parseFiles(allEntities);
// 	timeEnd('Parsing');

// 	time('Prerequistes');
// 	await prereq();
// 	timeEnd('Prerequistes');

// 	time('Creating modules');
// 	for (const ast in ASTs) {
// 		const m = new ModuleCreator(ASTs[ast].fullPath, ASTs[ast].sourceFile, ASTs);
// 		await m.build();
// 	}
// 	timeEnd('Creating modules');
// }

// main();
