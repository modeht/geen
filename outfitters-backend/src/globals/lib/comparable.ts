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

export type GenericComparable<T> = {
	value: T extends 'string'
		? string
		: T extends 'number'
			? number
			: T extends 'bool'
				? boolean
				: T extends 'date'
					? Date
					: never;
	operator: T extends 'string'
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
		value:
			type === 'string'
				? v.nullable(v.string())
				: type === 'number'
					? v.nullable(
							v.pipe(
								v.union([v.string(), v.number()]),
								v.transform((input) => +input),
								v.number(),
							),
						)
					: type === 'bool'
						? v.nullable(
								v.pipe(
									v.union([v.string(), v.boolean()]),
									v.transform((input) => (input === 'true' ? true : false)),
									v.boolean(),
								),
							)
						: type === 'date'
							? v.nullable(
									v.pipe(
										v.string('Invalid type: Expected ISO timestamp string'),
										v.isoTimestamp(),
									),
								)
							: v.never(),
		operator: v.enum(
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
