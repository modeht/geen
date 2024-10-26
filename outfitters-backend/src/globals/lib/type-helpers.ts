export type Primitive = string | number | boolean | Date;

export type TranslatableFields<T> = {
	[K in keyof T as T[K] extends string ? K : never]: boolean;
};

export type PrimitiveFields<T> = {
	[K in keyof T as T[K] extends Primitive
		? K extends 'createdAt' | 'updatedAt'
			? never
			: K
		: never]: boolean;
};

export type ComplexFields<T> = {
	[K in keyof T as T[K] extends Primitive
		? never
		: K extends 'translations'
			? never
			: K]: boolean;
};

export type ClassFields<T> = {
	[K in keyof T]: K extends 'createdAt' | 'updatedAt' ? never : T[K];
};

export type RelationKeys<T> = {
	[K in keyof T]: T[K] extends Array<infer U> | infer U
		? U extends object
			? K
			: never
		: never;
}[keyof T];

export type NestedRelationPaths<
	T,
	P extends string = '',
	D extends number = 3,
> = D extends 0
	? never
	: {
			[K in RelationKeys<T>]: T[K] extends Array<infer U>
				? U extends object
					? `${P}${K}` | `${P}${K}.${NestedRelationPaths<U, '', Prev[D]>}`
					: `${P}${K}`
				: T[K] extends object
					? `${P}${K}` | `${P}${K}.${NestedRelationPaths<T[K], '', Prev[D]>}`
					: never;
		}[RelationKeys<T>];

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type QueryableRelations<T extends string[]> = T extends []
	? Record<string, never>
	: T extends [infer Head, ...infer Rest]
		? Head extends string
			? Rest extends string[]
				? PathToNestedObject<Head> & QueryableRelations<Rest>
				: never
			: never
		: never;

type PathToNestedObject<Path extends string> = Path extends `${infer Head}.${infer Tail}`
	? { [K in Head]: PathToNestedObject<Tail> }
	: { [K in Path]: boolean };
