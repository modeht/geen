import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddCommentEntityUserEntityDto } from '../../users/generated-dtos/add-comment-entity-user-entity.dto';
import { AddCommentEntityPostEntityDto } from '../../posts/generated-dtos/add-comment-entity-post-entity.dto';
import { AddCommentEntityNotificationEntityDto } from '../../notifications/generated-dtos/add-comment-entity-notification-entity.dto';
import { AddCommentEntityMessageEntityDto } from '../../messages/generated-dtos/add-comment-entity-message-entity.dto';
import { MessageEntity } from '../../messages/entities/message.entity'



export class AddCommentEntityDto {
@IsString()
content: string;

@IsOptional()
@ValidateNested()
@Type(() => AddCommentEntityUserEntityDto)
commentor?: AddCommentEntityUserEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddCommentEntityPostEntityDto)
post?: AddCommentEntityPostEntityDto| null;

@IsNumber()
level: number;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddCommentEntityNotificationEntityDto)
notifications?: AddCommentEntityNotificationEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
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
