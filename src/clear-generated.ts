import { error, log } from 'console';
import { sync } from 'fast-glob';
import { rm, rmdir } from 'fs/promises';

const dirs = sync('**/*/generated-dtos', {
	onlyDirectories: true,
	absolute: true,
});
dirs.forEach((dir) => {
	rmdir(dir, { recursive: true })
		.then((r) => log(r))
		.catch((e) => error(e));
});
