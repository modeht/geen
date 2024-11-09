import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsString, IsEnum, IsNumber, IsOptional, IsDate, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ProductEntity } from '../../../products/entities/product.entity'
import { OrderItemEntity } from '../../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTargetEnum, PromotionTypeEnum } from '../../entities/enums'
import { SeasonalPromotionEntity } from '../../entities/seasonal-promotion.entity'



export class AddPromotionEntityDto {
@IsString()
title: string;

@IsNumber()
discountPercentage: number;

@IsNumber()
@IsOptional()
minPurchaseAmount?: number | null;

@IsDate()
@Type(()=>Date)
start: Date;

@IsDate()
@Type(()=>Date)
end: Date;

@IsBoolean()
isDeleted: boolean;

@IsNumber()
@IsOptional()
seasonalPromotionId?: number | null;

@IsNumber()
brandId: number;
}
