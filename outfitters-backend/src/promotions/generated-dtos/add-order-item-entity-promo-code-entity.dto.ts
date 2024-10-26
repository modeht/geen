import { IsNumber, IsOptional, IsDate, IsString, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { ProductEntity } from '../../products/entities/product.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../carts/entities/cart.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTypeEnum } from '../entities/enums'



export class AddOrderItemEntityPromoCodeEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
deletedAt?: Date| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
code?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
title?: string| null;

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
@IsOptionalIf((obj,_)=>!!obj.id)
start?: Date| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
end?: Date| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
discountPercentage?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
brandId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
shopperId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
ussageCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
totalMoneyDeducted?: number| null;
}
