import { Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

const subCategorySchema = Type.Union([
	Type.Object({
		name: Type.Optional(Type.String()),
		isArchived: Type.Boolean(),
	}),
	Type.Number(),
]);

export const category = Type.Object(
	{
		name: Type.String(),
		subCategory: subCategorySchema,
	},
	{
		metadata: {
			subCategory: 'CategoryEntity',
		},
	},
);

const compiledSchema = TypeCompiler.Compile(category);

console.log(category.metadata);
// Type.und
