import { CommentEntity } from 'src/comments/entities/comment.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsString, IsOptional, ValidateNested, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddPostEntityMediaEntityDto } from '../../media/generated-dtos/add-post-entity-media-entity.dto';
import { AddPostEntityTaggedProductEntityDto } from '../../products/generated-dtos/add-post-entity-tagged-product-entity.dto';
import { AddPostEntityUserEntityDto } from '../../users/generated-dtos/add-post-entity-user-entity.dto';
import { AddPostEntityPostLikesEntityDto } from '../generated-dtos/add-post-entity-post-likes-entity.dto';
import { AddPostEntityCommentEntityDto } from '../../comments/generated-dtos/add-post-entity-comment-entity.dto';
import { AddPostEntityMessageEntityDto } from '../../messages/generated-dtos/add-post-entity-message-entity.dto';
import { AddPostEntitySavedCollectionItemEntityDto } from '../../saved-collections/generated-dtos/add-post-entity-saved-collection-item-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { PostLikesEntity } from '../entities/posts-likes.entity'
import { SavedCollectionItemEntity } from '../../saved-collections/entities/saved-collection-item.entity'



export class AddPostEntityDto {
@IsString()
@IsOptional()
caption?: string | null;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntityMediaEntityDto)
media?: AddPostEntityMediaEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddPostEntityMediaEntityDto)
thumbnail?: AddPostEntityMediaEntityDto | null;

@IsOptional()
@IsOptional()
@Relation({entity:'TaggedProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntityTaggedProductEntityDto)
taggedProducts?: AddPostEntityTaggedProductEntityDto[] | null;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddPostEntityUserEntityDto)
postedBy?: AddPostEntityUserEntityDto| null;

@IsNumber()
postedById: number;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPostEntityUserEntityDto)
taggedUsers?: AddPostEntityUserEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'PostLikesEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntityPostLikesEntityDto)
likedByUsers?: AddPostEntityPostLikesEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CommentEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntityCommentEntityDto)
comments?: AddPostEntityCommentEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntityMessageEntityDto)
shares?: AddPostEntityMessageEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'SavedCollectionItemEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddPostEntitySavedCollectionItemEntityDto)
savedInCollections?: AddPostEntitySavedCollectionItemEntityDto[] | null;

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
