import { toJsonSchema } from '@valibot/to-json-schema';
import { sep } from 'path';
import { async } from 'fast-glob';
import { relative } from 'path';

async function createSchemas() {
	// const jsonschema = await import('@hyperjump/json-schema/draft-07');
	// const bundler = await import('@hyperjump/json-schema/bundle');
	// jsonschema.registerSchema();
	console.time('glob');
	const files = await async('**/*-query.schema.js', {
		absolute: true,
		onlyFiles: true,
		cwd: process.cwd(),
	});
	console.log(files);
	console.timeEnd('glob');
	const fi = relative(__dirname, files[0]).split(sep).join('/');
	console.log(fi);
	const f = await import('./' + fi).then((m) => m.default);
	const t = toJsonSchema(f.default, { errorMode: 'ignore' });
	// t.$id = 'test';
	// t.title = 'Test';
	// jsonschema.registerSchema(t as any);

	// const bundle = await bundler.bundle('./test.json');
	// console.log(bundle);
	// const jsonschema = toJsonSchema(ReadCountrySchema, {
	// 	errorMode: 'ignore',
	// 	definitions: {
	// 		ReadMediaSchema,
	// 	},
	// });
	// jsonschema.title = 'CountrySchemaQuery';
	// writeFile('./jsonschema.json', JSON.stringify(jsonschema, null, 4));
}
