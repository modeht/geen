import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsDate, IsString, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CollaborationEntity } from '../../../collaborations/entities/collaboration.entity'
import { CommentEntity } from '../../../comments/entities/comment.entity'
import { ConversationEntity } from '../../../conversations/entities/conversation.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class CreateMessageEntityDto {
@IsDate()
@Type(()=>Date)
readAt: Date;

@IsString()
@IsOptional()
content?: string | null;

@IsString()
@IsOptional()
reaction?: string | null;

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
