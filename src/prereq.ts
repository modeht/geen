import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { projectPath } from './utils';

export async function prereq() {
	writeFile(
		join(projectPath, 'src', 'generated-modules.ts'),
		await readFile(join(process.cwd(), 'src/prerequistes', 'app-module.template'), 'utf8')
	);
	writeFile(
		join(projectPath, 'src', 'schema-defs.ts'),
		await readFile(join(process.cwd(), 'src/prerequistes', 'schema-defs.template'), 'utf8')
	);
	//TODO: add decorators, validators, services
}
