import glob from 'fast-glob';
import { join } from 'path';
import prettier from 'prettier';
import { Cwd } from './Cwd.js';

export const prettierOptions: prettier.Options = {
	endOfLine: 'lf',
	printWidth: 120,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	parser: 'typescript',
};
