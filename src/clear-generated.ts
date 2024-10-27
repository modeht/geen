import { error, log } from 'console';
import { sync } from 'fast-glob';
import { rm, rmdir } from 'fs/promises';

const dirs = sync('**/*/generated-dtos', {
	onlyDirectories: true,
	absolute: true,
});

dirs.forEach((dir) => {
	rm(dir, { recursive: true })
		.then((r) => log('removed'))
		.catch((e) => error(e));
});

const controllers = sync('**/*/generated-*', {
	absolute: true,
});

controllers.forEach((co) => {
	rm(co, { recursive: true })
		.then((r) => log('removed'))
		.catch((e) => error(e));
});
