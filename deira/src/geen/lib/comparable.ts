import * as v from 'valibot';

export enum StringOperators {
	Eq = 'Eq',
	NotEq = 'NotEq',
	Contains = 'Contains',
	StartsWith = 'StartsWith',
	EndsWith = 'EndsWith',
	IsNull = 'IsNull',
	IsNotNull = 'IsNotNull',
}

export enum BoolOperators {
	Is = 'Is',
	IsNot = 'IsNot',
	IsNull = 'IsNull',
	IsNotNull = 'IsNotNull',
}

export enum DateOperators {
	Eq = 'Eq',
	NotEq = 'NotEq',
	GreaterThan = 'GreaterThan',
	LessThan = 'LessThan',
	GreaterThanOrEq = 'GreaterThanOrEq',
	LessThanOrEq = 'LessThanOrEq',
	IsNull = 'IsNull',
	IsNotNull = 'IsNotNull',
}

export enum NumberOperators {
	Eq = 'Eq',
	NotEq = 'NotEq',
	GreaterThan = 'GreaterThan',
	LessThan = 'LessThan',
	GreaterThanOrEq = 'GreaterThanOrEq',
	LessThanOrEq = 'LessThanOrEq',
	IsNull = 'IsNull',
	IsNotNull = 'IsNotNull',
}

export const AllOperators = {
	...StringOperators,
	...BoolOperators,
	...DateOperators,
	...NumberOperators,
} as const;

export type AllOperators = (typeof AllOperators)[keyof typeof AllOperators];

export type GenericComparable<T> = {
	$val: T extends 'string'
		? string
		: T extends 'number'
			? number
			: T extends 'bool'
				? boolean
				: T extends 'date'
					? Date
					: never;
	$op: T extends 'string'
		? StringOperators
		: T extends 'number'
			? NumberOperators
			: T extends 'bool'
				? BoolOperators
				: T extends 'date'
					? DateOperators
					: never;
};

export enum NeverOperators {}

export const comparable = <T extends 'string' | 'number' | 'bool' | 'date'>(type: T) => {
	return v.object({
		$val:
			type === 'string'
				? v.optional(v.string())
				: type === 'number'
					? v.optional(
							v.pipe(
								v.union([v.string(), v.number()]),
								v.transform((input) => +input),
								v.number(),
							),
						)
					: type === 'bool'
						? v.optional(
								v.pipe(
									v.union([v.string(), v.boolean()]),
									v.transform((input) => (input === 'true' ? true : false)),
									v.boolean(),
								),
							)
						: type === 'date'
							? v.optional(
									v.pipe(
										v.string('Invalid type: Expected ISO timestamp string'),
										v.isoTimestamp(),
									),
								)
							: v.never(),
		$op: v.enum(
			type === 'string'
				? StringOperators
				: type === 'number'
					? NumberOperators
					: type === 'bool'
						? BoolOperators
						: type === 'date'
							? DateOperators
							: NeverOperators,
		),
	}) as unknown as v.BaseSchema<
		GenericComparable<T>,
		GenericComparable<T>,
		v.BaseIssue<GenericComparable<T>>
	>;
};
