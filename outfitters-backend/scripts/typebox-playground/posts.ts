import { Type } from '@sinclair/typebox';
import { UserBase } from './user';

export const PostBase = Type.Object(
	{
		id: Type.String(),
		title: Type.String(),
		content: Type.String(),
		createdAt: Type.String({ format: 'date-time' }),
		updatedAt: Type.String({ format: 'date-time' }),
		user: Type.Ref(UserBase, { $id: 'User' }),
	},
	{
		$id: 'Post',
	},
);
