#!/usr/bin/env node
import glob from 'fast-glob';
import { parseFiles } from './file-parser.js';
import { time, timeEnd } from 'console';
import { prereq } from './prereq.js';
import { ModuleCreator } from './ModuleCreator.js';
import { Command } from 'commander';
import { Cwd } from './Cwd.js';
import { isAbsolute, join, sep } from 'path';
import { existsSync } from 'fs';
import chok from 'chokidar';
import { ASTs } from './lib/types/index.js';
import { CreateSchemaCreator } from './CreateSchemaCreator.js';
import { UpdateSchemaCreator } from './UpdateSchemaCreator.js';
import { ReadSchemaCreator } from './ReadSchemaCreator.js';
import { Asts } from './Asts.js';

const program = new Command();

program
	.option('-d, --dir <dir>', 'project directory, default is current working directory "process.cwd()"', process.cwd())
	.action(async (opts, command: Command) => {
		handleDirOption(opts, command);
		const allFiles = loadEntities();
		await init(allFiles);

		// const handleChange = async (path: string) => {
		// 	await change(path);
		// };
		// chok.watch(allFiles, { persistent: true }).on('change', handleChange);
	});

program.parse();

async function init(allEntities: string[] = []) {
	time('Parsing');
	const initASTs = await parseFiles(allEntities);
	Asts.setInstance(initASTs);
	timeEnd('Parsing');

	time('Prerequistes');
	await prereq();
	timeEnd('Prerequistes');

	time('Init Modules');
	for (const ast in initASTs) {
		const m = new ModuleCreator(ast, initASTs);
		await m.build();
	}
	timeEnd('Init Modules');
	// console.log(Asts);
}

//TODO: how to deal with not correct entities
async function change(entity: string) {
	time('New Parse');
	const newASTs = await parseFiles([entity]);
	// it is only one
	const newAstsKey = Object.keys(newASTs)[0];

	//find all asts that has relation with this schema
	const asts = { ...Asts.getInstance(), ...newASTs };
	const astsToUpdate: Record<string, any> = {
		[newAstsKey]: newASTs[newAstsKey],
	};
	Object.entries(asts).forEach(([key, value]) => {
		if (value.relations?.[newAstsKey]) {
			astsToUpdate[key] = value;
		}
	});
	timeEnd('New Parse');

	const r = new ReadSchemaCreator(newAstsKey, asts);
	r.baseSetup();
	await r.build();

	time('Update Schema');
	for (const k in astsToUpdate) {
		const c = new CreateSchemaCreator(k, asts);
		const u = new UpdateSchemaCreator(k, asts);
		await Promise.all([c.buildFile(), u.buildFile()]);
	}
	timeEnd('Update Schema');
}

// async function add(entity: string) {
// 	time('Parsing');
// 	const newASTs = await parseFiles([entity]);
// 	const ASTs = { ...initASTs, ...newASTs };
// 	timeEnd('Parsing');

// 	const currAST = newASTs[Object.keys(newASTs)[0]];

// 	console.log(currAST);
// 	console.log(ASTs);
// }

function loadEntities() {
	time('Loading entities');
	const allFiles = glob.sync('**/*/*.entity.ts', {
		cwd: Cwd.getInstance(),
		absolute: true,
		onlyFiles: true,
		ignore: ['**/node_modules', '**/dist'],
	});
	timeEnd('Loading entities');
	return allFiles;
}

function handleDirOption(opts: Record<string, boolean>, command: Command) {
	if (opts.dir) {
		const newCwd = command.getOptionValue('dir');
		if (newCwd.startsWith('.')) {
			Cwd.setInstance(join(process.cwd(), newCwd.split(sep).join('/')));
		} else if (isAbsolute(newCwd)) {
			Cwd.setInstance(newCwd);
		}
	}
	const nestCli = existsSync(join(Cwd.getInstance(), 'nest-cli.json'));
	const srcDir = existsSync(join(Cwd.getInstance(), 'src/main.ts'));
	if (!nestCli || !srcDir) {
		throw new Error('Directory is not a valid Nest.js project');
	}
}
