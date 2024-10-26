import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { NestedRelationPaths } from 'src/globals/lib/type-helpers';
import { PostEntity } from '../entities/post.entity';

export type PostQueryableRelations = NestedRelationPaths<PostEntity, '', 5>[];
export const postQueryableRelations = [
	'taggedUsers',
	'postedBy',
	'postedBy.brandProfile.logo',
	'postedBy.shopperProfile.profilePicture',
	'taggedProducts.product.media',
	'taggedProducts.affiliationLink',
] as const satisfies PostQueryableRelations;

export class FindPostsDto {
	@ApiProperty({
		description:
			'The ID of the user who posted the post, can be used to get a specific user posts',
		required: false,
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	postedById?: number;

	@ApiProperty({
		description:
			'The ID of the product tagged in the post, can be used to get posts that belong to a specific product (appears in)',
		required: false,
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	productId?: number;

	@ApiProperty({
		description:
			'The ID of the user tagged in the post, can be used to get posts that have a specific tagged user in them',
		required: false,
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	taggedUserId?: number;
}
