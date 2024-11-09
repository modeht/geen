import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsNumber, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CollaborationEntity } from '../../../collaborations/entities/collaboration.entity'
import { CommentEntity } from '../../../comments/entities/comment.entity'
import { ConversationEntity } from '../../../conversations/entities/conversation.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class AddMediaEntityMessageEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
readAt?: Date| null;

@IsString()
@IsOptional()
content?: string | null;

@IsString()
@IsOptional()
reaction?: string | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
fromId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
toId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
conversationId?: number| null;

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
