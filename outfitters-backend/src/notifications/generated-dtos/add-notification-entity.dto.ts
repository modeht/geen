import { CollaborationEntity } from 'src/collaborations/entities/collaboration.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { PromotionEntity } from 'src/promotions/entities/promotion.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsEnum, IsString, IsBoolean, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { NotificationType } from '../entities/notification.entity'
import { AddNotificationEntityUserEntityDto } from '../../users/generated-dtos/add-notification-entity-user-entity.dto';
import { AddNotificationEntityCollaborationEntityDto } from '../../collaborations/generated-dtos/add-notification-entity-collaboration-entity.dto';
import { AddNotificationEntityCommentEntityDto } from '../../comments/generated-dtos/add-notification-entity-comment-entity.dto';
import { AddNotificationEntityPromotionEntityDto } from '../../promotions/generated-dtos/add-notification-entity-promotion-entity.dto';
import { AddNotificationEntityProductEntityDto } from '../../products/generated-dtos/add-notification-entity-product-entity.dto';



export class AddNotificationEntityDto {
@IsEnum(NotificationType)
type: NotificationType;

@IsString()
customContent: string;

@IsBoolean()
isRead: boolean;

@IsOptional()
@ValidateNested()
@Type(() => AddNotificationEntityUserEntityDto)
user?: AddNotificationEntityUserEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddNotificationEntityCollaborationEntityDto)
collaboration?: AddNotificationEntityCollaborationEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddNotificationEntityCommentEntityDto)
comment?: AddNotificationEntityCommentEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddNotificationEntityPromotionEntityDto)
promotion?: AddNotificationEntityPromotionEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddNotificationEntityProductEntityDto)
product?: AddNotificationEntityProductEntityDto| null;

@IsNumber()
userId: number;

@IsNumber()
collaborationId: number;

@IsNumber()
commentId: number;

@IsNumber()
promotionId: number;

@IsNumber()
productId: number;
}
