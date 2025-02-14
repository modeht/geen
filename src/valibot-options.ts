import { ColumnOption } from './CreateSchemaCreator.js';

export const stringOptions = {
	length: 'number',
};

export function mapStringOptions(options: ColumnOption[]) {
	let valibotPipeline: string[] = [];
	for (const option of options) {
		if (option.key === 'length') {
			valibotPipeline.push(`v.maxLength(${option.value})`);
		}
	}
	return valibotPipeline;
}

export function castType(value: string, type: string) {
	switch (type) {
		case 'string':
			return value;
		case 'number':
			return Number(value);
		case 'boolean':
			return value === 'true';
	}
}
