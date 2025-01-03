import { glob } from 'fast-glob';

const allFiles = glob.sync('**/*/.entity.ts', {
	absolute: true,
	onlyFiles: true,
	ignore: ['**/node_modules', '**/dist'],
});
