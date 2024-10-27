import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsString, IsEnum, IsNumber, IsOptional, IsDate, IsArray, ValidateNested, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddPromotionEntityNotificationEntityDto } from '../../notifications/generated-dtos/add-promotion-entity-notification-entity.dto';
import { AddPromotionEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-promotion-entity-brand-profile-entity.dto';
import { AddPromotionEntitySeasonalPromotionEntityDto } from '../generated-dtos/add-promotion-entity-seasonal-promotion-entity.dto';
import { AddPromotionEntityProductEntityDto } from '../../products/generated-dtos/add-promotion-entity-product-entity.dto';
import { AddPromotionEntityOrderItemEntityDto } from '../../orders/generated-dtos/add-promotion-entity-order-item-entity.dto';
import { ProductEntity } from '../../products/entities/product.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTargetEnum, PromotionTypeEnum } from '../entities/enums'
import { SeasonalPromotionEntity } from '../entities/seasonal-promotion.entity'



export class AddPromotionEntityDto {
@IsString()
title: string;

@IsEnum(PromotionTypeEnum)
type: PromotionTypeEnum;

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

@IsEnum(PromotionTargetEnum)
target: PromotionTargetEnum;

@IsEnum(PromotionStatusEnum)
status: PromotionStatusEnum;

@IsOptional()
@Relation({entity:'NotificationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddPromotionEntityNotificationEntityDto)
notifications?: AddPromotionEntityNotificationEntityDto[] | null;

@IsOptional()
@Relation({entity:'BrandProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddPromotionEntityBrandProfileEntityDto)
brand?: AddPromotionEntityBrandProfileEntityDto| null;

@IsOptional()
@Relation({entity:'SeasonalPromotionEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddPromotionEntitySeasonalPromotionEntityDto)
seasonalPromotion?: AddPromotionEntitySeasonalPromotionEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddPromotionEntityProductEntityDto)
products?: AddPromotionEntityProductEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddPromotionEntityOrderItemEntityDto)
orderItems?: AddPromotionEntityOrderItemEntityDto[] | null;

@IsBoolean()
isDeleted: boolean;

@IsNumber()
@IsOptional()
seasonalPromotionId?: number | null;

@IsNumber()
brandId: number;
}
