import { CommentEntity } from 'src/comments/entities/comment.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../media/entities/media.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { PostLikesEntity } from '../entities/posts-likes.entity'
import { SavedCollectionItemEntity } from '../../saved-collections/entities/saved-collection-item.entity'



export class AddCommentEntityPostEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
caption?: string | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postedById?: number| null;

@IsNumber()
@IsOptional()
thumbnailId?: number | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
likesCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
commentsCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
taggedProductsCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
taggedUsersCount?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isLiked?: boolean| null;
}
