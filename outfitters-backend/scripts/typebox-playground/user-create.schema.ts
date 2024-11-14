import { Kind, TSchema, Type, TypeRegistry } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
// import { BrandProfileCreateSchema } from './brand-profile-create.schema';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
// import { BrandProfileCreateSchema } from './brand-profile-create.schema';
import { Static } from '@sinclair/typebox';

// First declare the types without the circular references
const BasePost = Type.Object(
	{
		id: Type.String(),
		title: Type.String(),
		content: Type.String(),
		createdAt: Type.String({ format: 'date-time' }),
		updatedAt: Type.String({ format: 'date-time' }),
	},
	{
		$id: 'Post',
	},
);

const BaseUser = Type.Object(
	{
		id: Type.String(),
		email: Type.String({ format: 'email' }),
		name: Type.String(),
		createdAt: Type.String({ format: 'date-time' }),
		updatedAt: Type.String({ format: 'date-time' }),
	},
	{
		$id: 'User',
	},
);

// Then create the full schemas with circular references
const Post = Type.Intersect(
	[
		BasePost,
		Type.Object({
			user: Type.Ref(BaseUser),
		}),
	],
	{
		$id: 'PostFull',
	},
);

const User = Type.Intersect(
	[
		BaseUser,
		Type.Object({
			posts: Type.Optional(Type.Array(Type.Ref(Post))),
		}),
	],
	{
		$id: 'UserFull',
	},
);

const FullPost = Type.Intersect(
	[
		BasePost,
		Type.Object({
			user: Type.Ref(User),
		}),
	],
	{
		$id: 'PostFull',
	},
);

const FullUser = Type.Intersect(
	[
		User,
		Type.Object({
			posts: Type.Optional(Type.Array(Type.Ref(FullPost))),
		}),
	],
	{
		$id: 'UserFull',
	},
);

// Export the types
export type Post = Static<typeof Post>;
export type User = Static<typeof User>;
export type FullUser = Static<typeof FullUser>;

// Export the schemas
export const PostSchema = Post;
export const UserSchema = User;

// Example of inferred types:
const user: FullUser = {
	id: '1',
	email: 'user@example.com',
	name: 'John Doe',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	posts: [
		{
			id: '1',
			title: 'First Post',
			content: 'Hello World',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			user: {
				id: '1',
				email: 'user@example.com',
				name: 'John Doe',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		},
	],
};

console.dir(FullUser, { depth: null });
