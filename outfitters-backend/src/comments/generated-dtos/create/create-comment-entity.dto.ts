import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MessageEntity } from '../../../messages/entities/message.entity'



export class CreateCommentEntityDto {
@IsString()
content: string;

@IsNumber()
level: number;

@IsNumber()
userId: number;

@IsNumber()
replyToId: number;

@IsNumber()
postId: number;

@IsNumber()
repliesDepth: number;
}
