import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsDate, IsString, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddMessageEntityMediaEntityDto } from '../../media/generated-dtos/add-message-entity-media-entity.dto';
import { AddMessageEntityCollaborationEntityDto } from '../../collaborations/generated-dtos/add-message-entity-collaboration-entity.dto';
import { AddMessageEntityPostEntityDto } from '../../posts/generated-dtos/add-message-entity-post-entity.dto';
import { AddMessageEntityStoryEntityDto } from '../../stories/generated-dtos/add-message-entity-story-entity.dto';
import { AddMessageEntityProductEntityDto } from '../../products/generated-dtos/add-message-entity-product-entity.dto';
import { AddMessageEntityConversationEntityDto } from '../../conversations/generated-dtos/add-message-entity-conversation-entity.dto';
import { AddMessageEntityUserEntityDto } from '../../users/generated-dtos/add-message-entity-user-entity.dto';
import { AddMessageEntityCommentEntityDto } from '../../comments/generated-dtos/add-message-entity-comment-entity.dto';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity'
import { CommentEntity } from '../../comments/entities/comment.entity'
import { ConversationEntity } from '../../conversations/entities/conversation.entity'
import { MediaEntity } from '../../media/entities/media.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { UserEntity } from '../../users/entities/user.entity'



export class AddMessageEntityDto {
@IsDate()
@Type(()=>Date)
readAt: Date;

@IsString()
@IsOptional()
content?: string | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddMessageEntityMediaEntityDto)
media?: AddMessageEntityMediaEntityDto[] | null;

@IsString()
@IsOptional()
reaction?: string | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CollaborationEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddMessageEntityCollaborationEntityDto)
collaboration?: AddMessageEntityCollaborationEntityDto | null;

@IsOptional()
@ValidateNested()
@Type(() => AddMessageEntityPostEntityDto)
post?: AddMessageEntityPostEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddMessageEntityStoryEntityDto)
story?: AddMessageEntityStoryEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddMessageEntityProductEntityDto)
product?: AddMessageEntityProductEntityDto| null;

@ValidateNested()
@Type(() => AddMessageEntityConversationEntityDto)
conversation: AddMessageEntityConversationEntityDto;

@IsOptional()
@ValidateNested()
@Type(() => AddMessageEntityUserEntityDto)
from?: AddMessageEntityUserEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddMessageEntityUserEntityDto)
to?: AddMessageEntityUserEntityDto| null;

@IsOptional()
@IsOptional()
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
