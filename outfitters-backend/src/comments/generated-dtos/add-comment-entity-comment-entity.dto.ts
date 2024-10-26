import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { MessageEntity } from '../../messages/entities/message.entity'



export class AddCommentEntityCommentEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

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
