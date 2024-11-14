import { Type } from '@sinclair/typebox';
import { User } from './user';

const PostUser = Type.Object(
	{
		user: Type.Ref(User),
	},
	{
		$id: 'UserRef',
	},
);

const PostBase = Type.Object(
	{
		id: Type.String(),
		title: Type.String(),
		content: Type.String(),
		createdAt: Type.String({ format: 'date-time' }),
		updatedAt: Type.String({ format: 'date-time' }),
	},
	{
		$id: 'PostBase',
	},
);

export const Post = Type.Intersect([PostBase, PostUser], {
	$id: 'Post',
});
