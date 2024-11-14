import { Type } from '@sinclair/typebox';
import { Post } from './posts';

const UserBase = Type.Object(
	{
		id: Type.String(),
		email: Type.String({ format: 'email' }),
		name: Type.String(),
		createdAt: Type.String({ format: 'date-time' }),
		updatedAt: Type.String({ format: 'date-time' }),
	},
	{
		$id: 'UserBase',
	},
);

const UserPosts = Type.Object(
	{
		posts: Type.Optional(Type.Array(Type.Ref(Post))),
	},
	{
		$id: 'PostRef',
	},
);

export const User = Type.Intersect([UserBase, UserPosts], {
	$id: 'User',
});

console.log(User);

// Utility type to prevent circular references
type Primitive = string | number | boolean | null | undefined;

// Type to check if a type is an object
type IsObject<T> = T extends object ? (T extends Primitive ? false : true) : false;

// Generic transformer type that can be customized
type PropertyTransformer<T> = T;

// Generic function type
type AnyFunction = (...args: any[]) => any;

// DeepMapped implementation with circular reference prevention
type DeepMapped<T, Seen = never> = T extends Primitive
	? PropertyTransformer<T> // Transform primitives
	: T extends Array<infer U>
		? T extends Seen // Check for circular reference in arrays
			? never
			: Array<DeepMapped<U, T | Seen>>
		: T extends AnyFunction
			? T // Keep functions as-is
			: T extends object
				? T extends Seen // Check for circular reference in objects
					? never
					: {
							[P in keyof T]: DeepMapped<T[P], T | Seen>;
						}
				: never;

// Example: Creating specific transformers
type DeepReadonly<T> = T extends Primitive
	? T
	: T extends Array<infer U>
		? ReadonlyArray<DeepReadonly<U>>
		: T extends AnyFunction
			? T
			: { readonly [P in keyof T]: DeepReadonly<T[P]> };

type DeepNullable<T> = T extends Primitive
	? T | null
	: T extends Array<infer U>
		? Array<DeepNullable<U>>
		: T extends AnyFunction
			? T
			: { [P in keyof T]: DeepNullable<T[P]> };

// Example interface with a method
interface Person {
	name: string;
	age: number;
	address: {
		street: string;
		city: string;
		country: string;
		users: Person;
	};
	contacts: {
		email: string;
		phone: {
			home: string;
			work: string;
		};
	};
	greet: (greeting: string) => string;
}

// Basic mapped type without transformation
type MappedPerson = DeepMapped<Person>;

// Readonly version
type ReadonlyPerson = DeepReadonly<Person>;

// Nullable version
type NullablePerson = DeepNullable<Person>;

// Example of usage:
// const person: MappedPerson = {
// 	name: 'John',
// 	age: 30,
// 	address: {
// 		street: '123 Main St',
// 		city: 'Boston',
// 		country: 'USA',
//     users
// 	},
// 	contacts: {
// 		email: 'john@example.com',
// 		phone: {
// 			home: '555-0123',
// 			work: '555-0124',
// 		},
// 	},
// 	greet: (greeting: string) => `${greeting}, I'm John`,
// };

// Additional utility types
type DeepPartial<T> = T extends Primitive
	? T
	: T extends Array<infer U>
		? Array<DeepPartial<U>>
		: T extends AnyFunction
			? T
			: { [P in keyof T]?: DeepPartial<T[P]> };

type DeepRequired<T> = T extends Primitive
	? T
	: T extends Array<infer U>
		? Array<DeepRequired<U>>
		: T extends AnyFunction
			? T
			: { [P in keyof T]-?: DeepRequired<T[P]> };
