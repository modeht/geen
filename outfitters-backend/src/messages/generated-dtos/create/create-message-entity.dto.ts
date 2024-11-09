import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsDate, IsString, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddMessageEntityMediaEntityDto } from '../../../media/generated-dtos/create/create-message-entity-media-entity.dto';
import { AddMessageEntityCollaborationEntityDto } from '../../../collaborations/generated-dtos/create/create-message-entity-collaboration-entity.dto';
import { AddMessageEntityPostEntityDto } from '../../../posts/generated-dtos/create/create-message-entity-post-entity.dto';
import { AddMessageEntityStoryEntityDto } from '../../../stories/generated-dtos/create/create-message-entity-story-entity.dto';
import { AddMessageEntityProductEntityDto } from '../../../products/generated-dtos/create/create-message-entity-product-entity.dto';
import { AddMessageEntityConversationEntityDto } from '../../../conversations/generated-dtos/create/create-message-entity-conversation-entity.dto';
import { AddMessageEntityUserEntityDto } from '../../../users/generated-dtos/create/create-message-entity-user-entity.dto';
import { AddMessageEntityCommentEntityDto } from '../../../comments/generated-dtos/create/create-message-entity-comment-entity.dto';
import { CollaborationEntity } from '../../../collaborations/entities/collaboration.entity'
import { CommentEntity } from '../../../comments/entities/comment.entity'
import { ConversationEntity } from '../../../conversations/entities/conversation.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class AddMessageEntityDto {
@IsDate()
@Type(()=>Date)
readAt: Date;

@IsString()
@IsOptional()
content?: string | null;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddMessageEntityMediaEntityDto)
media?: AddMessageEntityMediaEntityDto[] | null;

@IsString()
@IsOptional()
reaction?: string | null;

@IsOptional()
@Relation({entity:'CollaborationEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddMessageEntityCollaborationEntityDto)
collaboration?: AddMessageEntityCollaborationEntityDto | null;

@IsOptional()
@Relation({entity:'PostEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityPostEntityDto)
post?: AddMessageEntityPostEntityDto| null;

@IsOptional()
@Relation({entity:'StoryEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityStoryEntityDto)
story?: AddMessageEntityStoryEntityDto| null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityProductEntityDto)
product?: AddMessageEntityProductEntityDto| null;

@Relation({entity:'ConversationEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityConversationEntityDto)
conversation: AddMessageEntityConversationEntityDto;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityUserEntityDto)
from?: AddMessageEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityUserEntityDto)
to?: AddMessageEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'CommentEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddMessageEntityCommentEntityDto)
comment?: AddMessageEntityCommentEntityDto | null;

@IsNumber()
fromId: number;

@IsNumber()
toId: number;

@IsNumber()
conversationId: number;

@IsNumber()
@IsOptional()
collaborationId?: number | null;

@IsNumber()
@IsOptional()
postId?: number | null;

@IsNumber()
@IsOptional()
storyId?: number | null;

@IsNumber()
@IsOptional()
commentId?: number | null;

@IsNumber()
@IsOptional()
productId?: number | null;
}
