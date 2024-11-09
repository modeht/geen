import { error, log } from 'console';
import { sync } from 'fast-glob';
import { rm, rmdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { readFileSync } from 'fs';
import { projectPath } from './utils';

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

writeFile(
	join(projectPath, 'src', 'generated-modules.ts'),
	readFileSync(join(process.cwd(), 'templates', 'app-module.template'), 'utf8')
).then((r) => log('reset modules'));
