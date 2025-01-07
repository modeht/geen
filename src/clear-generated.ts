import { error, log } from 'console';
import { sync } from 'fast-glob';
import { rm } from 'fs/promises';
import { prereq } from './prereq.js';

const dirs = sync('**/*/generated-*', {
	onlyDirectories: true,
	absolute: true,
});

dirs.forEach((dir) => {
	rm(dir, { recursive: true })
		.then((r) => log('directory removed'))
		.catch((e) => error(e));
});

const controllers = sync('**/*/generated-*', {
	absolute: true,
	onlyFiles: true,
	ignore: ['geen-modules'],
});

controllers.forEach((co) => {
	rm(co, { recursive: true })
		.then((r) => log('controller removed'))
		.catch((e) => error(e));
});

prereq().then(() => console.log('prereq done'));
