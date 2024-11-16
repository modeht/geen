import * as v from 'valibot';

enum StringOperators {
	Eq,
	NotEq,
	Contains,
}

enum NumberOperators {
	Eq,
	GreaterThan,
	LessThan,
}

type GenericComparable<T> = {
	value: T extends 'string' ? string : T extends 'number' ? number : never;
	operator: T extends 'string'
		? StringOperators
		: T extends 'number'
			? NumberOperators
			: never;
};

// type NumberComparable = {
// 	value: number;
// 	operator: NumberOperators;
// };

const compareable = <T extends 'string' | 'number'>(type: T) => {
	if (type === 'string') {
		return v.object({
			value: v.string(),
			operator: v.enum(StringOperators),
		}) as unknown as v.BaseSchema<
			GenericComparable<T>,
			GenericComparable<T>,
			v.BaseIssue<GenericComparable<T>>
		>;
	} else if (type === 'number') {
		return v.object({
			value: v.number(),
			operator: v.enum(NumberOperators),
		}) as unknown as v.BaseSchema<
			GenericComparable<T>,
			GenericComparable<T>,
			v.BaseIssue<GenericComparable<T>>
		>;
	} else {
		return v.never();
	}
};

const UserSchema = v.object({
	name: v.nullish(compareable('string')),
	age: v.nullish(compareable('number')),
});

type TUserSchema = v.InferInput<typeof UserSchema>;

const u = {
	age: {
		operator: NumberOperators.Eq,
		value: 1,
	},
};

v.parse(UserSchema, u);
// import {
// 	object,
// 	string,
// 	number,
// 	union,
// 	custom,
// 	BaseSchema,
// 	BaseIssue,
// 	InferOutput,
// } from 'valibot';

// // Helper type to infer the correct value type based on T
// type ValueType<T> = T extends string
// 	? { value: string }
// 	: T extends number
// 		? { value: number }
// 		: never;

// // Schema creator function that infers the correct type
// function createFieldSchema<T extends string | number>(type: 'string' | 'number') {
// 	return object({
// 		value: type === 'string' ? string() : number(),
// 	}) as unknown as BaseSchema<{ value: T }, { value: T }, BaseIssue<{ value: T }>>;
// }

// // Example user schema
// const userSchema = object({
// 	name: createFieldSchema<string>('string'),
// 	age: createFieldSchema<number>('number'),
// });

// // Type inference works correctly
// type User = InferOutput<typeof userSchema>;
// // Will be inferred as:
// // {
// //   name: { value: string };
// //   age: { value: number };
// // }

// // Example usage:
// const validUser = {
// 	name: { value: 'John' },
// 	age: { value: 25 },
// };

// // TypeScript will error on this:
// const invalidUser: User = {
// 	name: { value: 123 }, // Error: Type 'number' is not assignable to type 'string'
// 	age: { value: '25' }, // Error: Type 'string' is not assignable to type 'number'
// };
