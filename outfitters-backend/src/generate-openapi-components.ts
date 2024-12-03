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
				if (
					key === '$ref' &&
					typeof obj[key] === 'string' &&
					obj[key].startsWith('#/$defs/')
				) {
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

	return finalComponents;
}
