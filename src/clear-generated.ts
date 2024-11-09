import { error, log } from 'console';
import { sync } from 'fast-glob';
import { rm } from 'fs/promises';
import { prereq } from './prereq';

const dirs = sync('**/*/generated-dtos', {
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
	ignore: ['generated-modules'],
});

controllers.forEach((co) => {
	rm(co, { recursive: true })
		.then((r) => log('controller removed'))
		.catch((e) => error(e));
});

prereq();