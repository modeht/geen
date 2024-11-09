import { sync } from 'fast-glob';
import { join } from 'path';

export const appModulePath = sync('**/*/generated-modules.ts', {
	absolute: true,
	onlyFiles: true,
})[0];

export const projectPath = join(process.cwd(), 'outfitters-backend');
