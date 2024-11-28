import { toJsonSchema } from '@valibot/to-json-schema';
import { ReadCountrySchema } from '../../src/countries/generated-schemas/read-country.schema';
import { ReadMediaFiltersSchema } from '../../src/media/generated-schemas/read-media-filters.schema';

console.log(
	toJsonSchema(ReadCountrySchema, {
		errorMode: 'ignore',
	}),
);
