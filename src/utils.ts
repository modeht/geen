import glob from 'fast-glob';
import { join } from 'path';

export const projectPath = join(process.cwd(), 'outfitters-backend');
export const appModulePath = glob.sync('generated-modules.ts', {
	absolute: true,
	onlyFiles: true,
	deep: 0,
	cwd: join(projectPath, 'src'),
})[0];

export const globalsDirPath = join(projectPath, 'src/globals');
