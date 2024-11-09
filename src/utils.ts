import { sync } from 'fast-glob';
import { join } from 'path';

export const projectPath = join(process.cwd(), 'outfitters-backend');
export const appModulePath = sync('generated-modules.ts', {
	absolute: true,
	onlyFiles: true,
	deep: 0,
	cwd: join(projectPath, 'src'),
})[0];

export const globalDirPath = join(projectPath, 'src/globals');
