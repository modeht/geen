import convert from '@openapi-contrib/json-schema-to-openapi-schema';
import { getDefs } from './parse-schemas';
import { writeFile } from 'fs/promises';

export async function createComponentsSchemas() {
	const { allSchemas, defs } = await getDefs();
	const defsTypes = `
interface ISchemaDefs {
  [key: string]: string;
	${Object.keys(defs)
		.map((k) => `\t${k}: string;`)
		.join('\n')}
}

export const SchemaDefs: ISchemaDefs = {
		${Object.keys(defs)
			.map((k) => `\t${k}: '#/components/schemas/${k}',`)
			.join('\n')}
}`;

	await writeFile('./src/schema-defs.ts', defsTypes)
		.then(() => {
			console.log('schema-defs.ts created');
		})
		.catch((err) => {
			console.error('error creating schema-defs.ts');
			console.error(err);
		})
		.finally(() => {
			console.log('create-schema-types.ts finished');
		});

	const schema = allSchemas[Object.keys(allSchemas)[0]];
	if (!schema) return {};
	const convertedSchema = await convert(schema, {
		convertUnreferencedDefinitions: false,
		cloneSchema: true,
	});

	const replaceRefs = (obj: any) => {
		if (typeof obj === 'object' && obj !== null) {
			for (const key in obj) {
				if (key === '$ref' && typeof obj[key] === 'string' && obj[key].startsWith('#/$defs/')) {
					obj[key] = obj[key].replace('#/$defs/', '#/components/schemas/');
				} else {
					replaceRefs(obj[key]);
				}
			}
		}
	};
	replaceRefs(convertedSchema);

	const finalComponents = structuredClone(convertedSchema['x-$defs']);
	delete convertedSchema['x-$defs'];

	const fixNulls = (obj: any) => {
		if (typeof obj === 'object' && obj !== null) {
			for (const key in obj) {
				if (key === 'anyOf' && Array.isArray(obj[key])) {
					const hasNullObj = obj[key].findIndex((item: any) => item?.type === 'null');
					if (hasNullObj > -1 && obj[key].length === 2) {
						obj[key][0].nullable = true;
						Object.assign(obj, obj[key][0]);
						delete obj[key];
						fixNulls(obj);
					} else if (hasNullObj > -1 && obj[key].length > 2) {
						obj[key].splice(hasNullObj, 1);
						for (const k in obj[key]) {
							obj[key][k].nullable = true;
						}
						fixNulls(obj[key]);
					} else {
						fixNulls(obj[key]);
					}
				} else {
					fixNulls(obj[key]);
				}
			}
		}
	};
	fixNulls(finalComponents);

	return finalComponents;
}
