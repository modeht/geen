import * as v from 'valibot';

export enum StringOperators {
	Eq,
	NotEq,
	Contains,
	StartsWith,
	EndsWith,
	IsNull,
	IsNotNull,
}

export enum BoolOperators {
	Is,
	IsNot,
	IsNull,
	IsNotNull,
}

export enum DateOperators {
	Eq,
	NotEq,
	GreaterThan,
	LessThan,
	GreaterThanOrEq,
	LessThanOrEq,
	IsNull,
	IsNotNull,
}

export enum NumberOperators {
	Eq,
	NotEq,
	GreaterThan,
	LessThan,
	GreaterThanOrEq,
	LessThanOrEq,
	IsNull,
	IsNotNull,
}

type GenericComparable<T> = {
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

export const compareable = <T extends 'string' | 'number' | 'bool' | 'date'>(type: T) => {
	return v.object({
		value:
			type === 'string'
				? v.nullable(v.string())
				: type === 'number'
					? v.nullable(v.number())
					: type === 'bool'
						? v.nullable(v.boolean())
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
