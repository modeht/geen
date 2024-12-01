import { sep } from 'path';
import { sync } from 'fast-glob';
import { relative } from 'path';
import { log } from 'console';
import { toJsonSchema } from '@valibot/to-json-schema';
import { writeFile } from 'fs/promises';

const defs: Record<string, any> = {};
const allSchemas: Record<string, any> = {};

export function getDefs() {
	if (Object.keys(defs).length > 0) {
		log('defs already created');
		return { defs, allSchemas };
	}

	log('defs not created, creating...');

	console.warn('project need to be build');

	console.time('glob');
	const files = sync('**/*.schema.js', {
		absolute: true,
		onlyFiles: true,
		cwd: process.cwd(),
	});
	console.timeEnd('glob');

	const imports = [];
	for (const file of files) {
		const relativePathToFile = relative(__dirname, file).split(sep).join('/');

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const fileImport = require('./' + relativePathToFile);

		let fileName = file.split('/').at(-1).replace('.schema.js', '');
		if (fileImport.default) {
			fileName = fileName
				.split('-')
				.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
				.join('');
			imports.push({ [fileName]: fileImport.default });
			defs[fileName] = fileImport.default;
		} else {
			log(`no default for ${fileName}`);
		}
	}

	for (const imp of imports) {
		const fileName = Object.keys(imp)[0];
		const jsonSchema = toJsonSchema(imp[fileName], {
			definitions: defs,
			errorMode: 'ignore',
		});
		// delete jsonSchema.$defs;
		allSchemas[fileName] = jsonSchema;
	}

	return { defs, allSchemas };
}
