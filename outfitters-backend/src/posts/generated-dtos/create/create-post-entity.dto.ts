import { CommentEntity } from 'src/comments/entities/comment.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { UserEntity } from '../../../users/entities/user.entity'
import { PostLikesEntity } from '../../entities/posts-likes.entity'
import { SavedCollectionItemEntity } from '../../../saved-collections/entities/saved-collection-item.entity'



export class AddPostEntityDto {
@IsString()
@IsOptional()
caption?: string | null;

@IsNumber()
postedById: number;

@IsNumber()
@IsOptional()
thumbnailId?: number | null;

@IsNumber()
likesCount: number;

@IsNumber()
commentsCount: number;

@IsNumber()
taggedProductsCount: number;

@IsNumber()
taggedUsersCount: number;

@IsBoolean()
isLiked: boolean;
}
