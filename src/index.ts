#!/usr/bin/env node
import glob from 'fast-glob';
import { parseFiles } from './file-parser.js';
import { time, timeEnd } from 'console';
import { prereq } from './prereq.js';
import { ModuleCreator } from './ModuleCreator.js';
import { Command } from 'commander';
import { Cwd } from './Cwd.js';
import { isAbsolute, join, sep } from 'path';

const program = new Command();

program
	.option('-d, --dir <dir>', 'project directory, default is current working directory "process.cwd()"', process.cwd())
	.action((opts, command: Command) => {
		if (opts.dir) {
			const newCwd = command.getOptionValue('dir');
			console.log(newCwd);
			if (newCwd.startsWith('.')) {
				Cwd.setInstance(join(process.cwd(), newCwd.split(sep).join('/')));
			} else if (isAbsolute(newCwd)) {
				Cwd.setInstance(newCwd);
			}
		}
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
