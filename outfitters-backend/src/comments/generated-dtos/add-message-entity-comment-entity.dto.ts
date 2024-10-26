import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { MessageEntity } from '../../messages/entities/message.entity'



export class AddMessageEntityCommentEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
content?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
level?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
replyToId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
repliesDepth?: number| null;
}
