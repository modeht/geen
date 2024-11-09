import { IsNumber, IsOptional } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ProductVariantEntity } from '../../../products/entities/product-variant.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { BrandOrderEntity } from '../../entities/brand-orders.entity'
import { PromotionEntity } from '../../../promotions/entities/promotion.entity'
import { PromoCodeEntity } from '../../../promotions/entities/promo-code.entity'



export class AddPromotionEntityOrderItemEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
quantity?: number | null;

@IsNumber()
@IsOptional()
unitSalePrice?: number | null;

@IsNumber()
@IsOptional()
unitPurchasePrice?: number | null;

@IsNumber()
@IsOptional()
totalSalePrice?: number | null;

@IsNumber()
@IsOptional()
totalPurchasePrice?: number | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
brandOrderId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
variantId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
promoCodeId?: number| null;
}
