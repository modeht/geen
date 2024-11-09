import { CollaborationEntity } from 'src/collaborations/entities/collaboration.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { PromotionEntity } from 'src/promotions/entities/promotion.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsEnum, IsString, IsBoolean, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { NotificationType } from '../../entities/notification.entity'



export class AddNotificationEntityDto {
@IsString()
customContent: string;

@IsBoolean()
isRead: boolean;

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
