import glob from 'fast-glob';
import { join } from 'path';
import prettier from 'prettier';

export const projectPath = join(process.cwd(), 'outfitters-backend');
export const appModulePath = glob.sync('generated-modules.ts', {
	absolute: true,
	onlyFiles: true,
	deep: 0,
	cwd: join(projectPath, 'src'),
})[0];

export const globalsDirPath = join(projectPath, 'src/globals');
export const prettierOptions: prettier.Options = {
	endOfLine: 'lf',
	printWidth: 120,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	parser: 'typescript',
};
