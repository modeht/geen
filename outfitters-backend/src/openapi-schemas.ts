import convert from '@openapi-contrib/json-schema-to-openapi-schema';
import { writeFileSync } from 'fs';
import { getDefs } from './schemas';
import { writeFile } from 'fs/promises';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const schema = require('../read-country-query.json');

const { allSchemas, defs } = getDefs();

export async function createComponentsSchemas() {
	const defsTypes = `export enum SchemaDefs {
		${Object.keys(defs)
			.map((k) => `\t${k} = '#/components/schemas/${k}',`)
			.join('\n')}
	}`;
	await writeFile('./src/schema-defs.ts', defsTypes);

	const schema = allSchemas[Object.keys(allSchemas)[0]];
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
