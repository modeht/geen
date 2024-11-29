import convert from '@openapi-contrib/json-schema-to-openapi-schema';
import { writeFileSync } from 'fs';
import { getDefs } from './schemas';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const schema = require('../read-country-query.json');

const { allSchemas } = getDefs();
console.log(allSchemas);
// (async () => {
// 	const convertedSchema = await convert(schema, {
// 		convertUnreferencedDefinitions: false,
// 		cloneSchema: true,
// 		// dereferenceOptions: {
// 		// 	dereference: {
// 		// 		// circular: 'ignore',
// 		// 		onDereference: (path, value, parent, parentPropName) => {
// 		// 			console.log(path, value, parent, parentPropName);
// 		// 		},
// 		// 	},
// 		// },
// 	});
// 	// console.dir(convertedSchema['x-$defs']['ReadCountryQuery'], { depth: 5 });
// 	// console.dir(convertedSchema['x-$defs']['ReadCountryFilters'], { depth: 5 });
// 	convertedSchema.components = {
// 		...convertedSchema.components,
// 		schemas: structuredClone(convertedSchema['x-$defs']),
// 	};
// 	delete convertedSchema['x-$defs'];
// 	const replaceRefs = (obj) => {
// 		if (typeof obj === 'object' && obj !== null) {
// 			for (const key in obj) {
// 				if (
// 					key === '$ref' &&
// 					typeof obj[key] === 'string' &&
// 					obj[key].startsWith('#/$defs/')
// 				) {
// 					obj[key] = obj[key].replace('#/$defs/', '#/components/schemas/');
// 				} else {
// 					replaceRefs(obj[key]);
// 				}
// 			}
// 		}
// 	};

// 	replaceRefs(convertedSchema);

// 	console.dir(convertedSchema, { depth: 1 });
// 	writeFileSync('test.json', JSON.stringify(convertedSchema, null, 2));
// })();
