import * as v from 'valibot';

export const ReadPaginationSchema = v.object({
	skip: v.optional(
		v.pipe(
			v.union([v.string(), v.number()]),
			v.transform((input) => +input),
			v.number(),
		),
		0,
	),
	take: v.optional(
		v.pipe(
			v.union([v.string(), v.number()]),
			v.transform((input) => +input),
			v.number(),
		),
		25,
	),
});

export type TReadPaginationSchemaInput = v.InferInput<typeof ReadPaginationSchema>;
export type TReadPaginationSchemaOutput = v.InferOutput<typeof ReadPaginationSchema>;
