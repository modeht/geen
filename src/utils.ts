import prettier from 'prettier';

export const prettierOptions: prettier.Options = {
	endOfLine: 'lf',
	printWidth: 120,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	parser: 'typescript',
};
