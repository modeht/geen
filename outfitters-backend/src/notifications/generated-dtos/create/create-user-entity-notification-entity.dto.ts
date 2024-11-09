import { CollaborationEntity } from 'src/collaborations/entities/collaboration.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { PromotionEntity } from 'src/promotions/entities/promotion.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNumber, IsOptional, IsEnum, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { NotificationType } from '../../entities/notification.entity'



export class AddUserEntityNotificationEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
customContent?: string| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isRead?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
collaborationId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
commentId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
promotionId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;
}
