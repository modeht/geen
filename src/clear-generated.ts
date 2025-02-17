import { error, log } from 'console';
import fastGlob from 'fast-glob';
import { rm } from 'fs/promises';
import { prereq } from './prereq.js';
import { join } from 'path';
import { Cwd } from './Cwd.js';

const cwd = join(process.cwd(), 'nest-template');
Cwd.setInstance(cwd);

const dirs = fastGlob.sync('**/*/generated-*', {
	onlyDirectories: true,
	absolute: true,
	cwd,
	ignore: ['**/node_modules'],
});

const modules = fastGlob.sync('**/*/*-feature', {
	onlyDirectories: true,
	absolute: true,
	cwd,
	ignore: ['**/node_modules'],
});

console.log({ modules, dirs });

[...dirs, ...modules].forEach((dir) => {
	rm(dir, { recursive: true })
		.then((r) => log('directory removed'))
		.catch((e) => error(e));
});

const controllers = fastGlob.sync('**/*/generated-*', {
	absolute: true,
	onlyFiles: true,
	cwd,
	ignore: ['geen-modules', '**/node_modules'],
});

controllers.forEach((co) => {
	rm(co, { recursive: true })
		.then((r) => log('controller removed'))
		.catch((e) => error(e));
});

prereq().then(() => console.log('prereq done'));
