import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsNumber, IsOptional, IsString, IsEnum, IsDate, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { ProductEntity } from '../../products/entities/product.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTargetEnum, PromotionTypeEnum } from '../entities/enums'
import { SeasonalPromotionEntity } from '../entities/seasonal-promotion.entity'



export class AddNotificationEntityPromotionEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
title?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
discountPercentage?: number| null;

@IsNumber()
@IsOptional()
minPurchaseAmount?: number | null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
start?: Date| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
end?: Date| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isDeleted?: boolean| null;

@IsNumber()
@IsOptional()
seasonalPromotionId?: number | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
brandId?: number| null;
}
