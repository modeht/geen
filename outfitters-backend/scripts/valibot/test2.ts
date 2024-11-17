// // create the classes
// // all fields are

// class ProfileFilters {
// 	name?: GenericComparable<'string'> | null | undefined;
// 	age?: GenericComparable<'number'> | null | undefined;
// 	user?: UserFilters | null | undefined;
// }

// class UserFilters {
// 	name?: GenericComparable<'string'> | null | undefined;
// 	age?: GenericComparable<'number'> | null | undefined;
// 	profile?: ProfileFilters | null | undefined;
// }

// const ProfileFiltersSchema: v.GenericSchema<ProfileFilters> = v.object({
// 	name: v.nullish(compareable('string')),
// 	age: v.nullish(compareable('number')),
// 	user: v.nullish(v.lazy(() => UserFiltersSchema)),
// });

// const UserFiltersSchema = v.object({
// 	name: v.nullish(compareable('string')),
// 	age: v.nullish(compareable('number')),
// 	profile: v.nullish(v.lazy(() => ProfileFiltersSchema)),
// });

// type TUserSchema = v.InferInput<typeof UserFiltersSchema>;

// const u: TUserSchema = {
// 	age: {
// 		operator: NumberOperators.Eq,
// 		value: 1,
// 	},
// 	profile: {
// 		age: {
// 			operator: NumberOperators.Eq,
// 			// @ts-expect-error testing
// 			value: '1',
// 		},
// 	},
// };

// v.parse(UserFiltersSchema, u);
