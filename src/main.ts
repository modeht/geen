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
import { CreateSchemaCreator } from './CreateSchemaCreator.js';
import { UpdateSchemaCreator } from './UpdateSchemaCreator.js';
import { ReadSchemaCreator } from './ReadSchemaCreator.js';
import { Asts } from './Asts.js';
import chok from 'chokidar';
import { ASTs } from './lib/types/index.js';

const program = new Command();

program
	.option('-d, --dir <dir>', 'project directory, default is current working directory "process.cwd()"', process.cwd())
	.option('-g, --glob <glob>', 'entity files glob pattern', '**/*/*.entity.ts')
	.option('-w, --cwd <cwd>', 'entities cwd, default is <<project dir>>/src')
	.action(async (opts, command: Command) => {
		//
		handleDirOption(opts);
		const globCwd = handleEntityCwd(opts.cwd);
		let allEntities = loadEntities();
		let selectedEntities: string[] = [];
		if (globCwd) {
			selectedEntities = allEntities.filter((e) => e.startsWith(globCwd));
			allEntities = allEntities.filter((e) => !selectedEntities.includes(e));
		}

		await init(allEntities, selectedEntities);

		const handleChange = async (path: string) => {
			await change(path);
		};
		chok.watch(allEntities, { persistent: true }).on('change', handleChange);
	});

program.parse();

async function init(allEntities: string[] = [], selectedEntities?: string[]) {
	time('Parsing');

	const rest = await parseFiles(allEntities);
	Asts.setInstance(rest);

	let curr: ASTs;
	if (selectedEntities?.length) {
		curr = await parseFiles(selectedEntities);
	} else {
		curr = rest;
	}
	timeEnd('Parsing');

	time('Prerequistes');
	await prereq();
	timeEnd('Prerequistes');

	time('Init Modules');
	//loop over the selected entities
	for (const ast in curr) {
		const m = new ModuleCreator(ast, { ...rest, ...curr });
		await m.build();
	}
	timeEnd('Init Modules');
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

export type EntitiesOptions = {
	pattern?: string;
	cwd?: string;
};

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

function loadSpecific(opts: EntitiesOptions = {}) {
	time('Loading entities');
	const allFiles = glob.sync(opts.pattern || '**/*/*.entities.ts', {
		cwd: opts.cwd || Cwd.getInstance(),
		absolute: true,
		onlyFiles: true,
		ignore: ['**/node_modules', '**/dist'],
	});
	timeEnd('Loading entities');
	return allFiles;
}

// load all entities anyway it doesn't take too much time
// parse all but only generate the selected entities

function handleDirOption(opts: Record<string, string>) {
	if (opts.dir) {
		if (opts.dir.startsWith('.')) {
			Cwd.setInstance(join(process.cwd(), opts.dir.split(sep).join('/')));
		} else if (isAbsolute(opts.dir)) {
			Cwd.setInstance(opts.dir);
		}
	}
	const nestCli = existsSync(join(Cwd.getInstance(), 'nest-cli.json'));
	const srcDir = existsSync(join(Cwd.getInstance(), 'src/main.ts'));
	if (!nestCli || !srcDir) {
		throw new Error('Directory is not a valid Nest.js project');
	}
}

function handleEntityCwd(path?: string) {
	if (!path) return undefined;
	if (isAbsolute(path)) {
		return path.split(sep).join('/');
	} else {
		return join(Cwd.getInstance(), 'src', path).split(sep).join('/');
	}
}
