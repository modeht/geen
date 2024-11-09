import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional, ValidateNested, IsNumber, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddCommentEntityUserEntityDto } from '../../../users/generated-dtos/create/create-comment-entity-user-entity.dto';
import { AddCommentEntityPostEntityDto } from '../../../posts/generated-dtos/create/create-comment-entity-post-entity.dto';
import { AddCommentEntityNotificationEntityDto } from '../../../notifications/generated-dtos/create/create-comment-entity-notification-entity.dto';
import { AddCommentEntityMessageEntityDto } from '../../../messages/generated-dtos/create/create-comment-entity-message-entity.dto';
import { MessageEntity } from '../../../messages/entities/message.entity'



export class AddCommentEntityDto {
@IsString()
content: string;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCommentEntityUserEntityDto)
commentor?: AddCommentEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'PostEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCommentEntityPostEntityDto)
post?: AddCommentEntityPostEntityDto| null;

@IsNumber()
level: number;

@IsOptional()
@Relation({entity:'NotificationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCommentEntityNotificationEntityDto)
notifications?: AddCommentEntityNotificationEntityDto[] | null;

@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCommentEntityMessageEntityDto)
messages?: AddCommentEntityMessageEntityDto[] | null;

@IsNumber()
userId: number;

@IsNumber()
replyToId: number;

@IsNumber()
postId: number;

@IsNumber()
repliesDepth: number;
}
