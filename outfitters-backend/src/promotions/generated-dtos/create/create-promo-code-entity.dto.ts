import { IsDate, IsString, IsNumber, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ProductEntity } from '../../../products/entities/product.entity'
import { BrandProfileEntity } from '../../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../../carts/entities/cart.entity'
import { OrderItemEntity } from '../../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTypeEnum } from '../../entities/enums'



export class CreatePromoCodeEntityDto {
@IsDate()
@Type(()=>Date)
deletedAt: Date;

@IsString()
code: string;

@IsString()
title: string;

@IsNumber()
@IsOptional()
minPurchaseAmount?: number | null;

@IsNumber()
@IsOptional()
perUserLimit?: number | null;

@IsNumber()
@IsOptional()
totalLimit?: number | null;

@IsDate()
@Type(()=>Date)
start: Date;

@IsDate()
@Type(()=>Date)
end: Date;

@IsNumber()
discountPercentage: number;

@IsNumber()
brandId: number;

@IsNumber()
shopperId: number;

@IsNumber()
ussageCount: number;

@IsNumber()
totalMoneyDeducted: number;
}
