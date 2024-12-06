import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Cwd } from './Cwd.js';

export async function prereq() {
	await writeFile(
		join(Cwd.getInstance(), 'src', 'generated-modules.ts'),
		await readFile(join(process.cwd(), 'src/prerequistes', 'app-module.template'), 'utf8')
	);
	await writeFile(
		join(Cwd.getInstance(), 'src', 'schema-defs.ts'),
		await readFile(join(process.cwd(), 'src/prerequistes', 'schema-defs.template'), 'utf8')
	);
	//TODO: add decorators, validators, services
}
