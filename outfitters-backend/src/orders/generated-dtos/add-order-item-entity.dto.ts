import { IsNumber, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddOrderItemEntityBrandOrderEntityDto } from '../generated-dtos/add-order-item-entity-brand-order-entity.dto';
import { AddOrderItemEntityProductVariantEntityDto } from '../../products/generated-dtos/add-order-item-entity-product-variant-entity.dto';
import { AddOrderItemEntityProductEntityDto } from '../../products/generated-dtos/add-order-item-entity-product-entity.dto';
import { AddOrderItemEntityPromoCodeEntityDto } from '../../promotions/generated-dtos/add-order-item-entity-promo-code-entity.dto';
import { AddOrderItemEntityPromotionEntityDto } from '../../promotions/generated-dtos/add-order-item-entity-promotion-entity.dto';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { BrandOrderEntity } from '../entities/brand-orders.entity'
import { PromotionEntity } from '../../promotions/entities/promotion.entity'
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity'



export class AddOrderItemEntityDto {
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

@IsOptional()
@Relation({entity:'BrandOrderEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddOrderItemEntityBrandOrderEntityDto)
brandOrder?: AddOrderItemEntityBrandOrderEntityDto| null;

@IsOptional()
@Relation({entity:'ProductVariantEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddOrderItemEntityProductVariantEntityDto)
variant?: AddOrderItemEntityProductVariantEntityDto| null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddOrderItemEntityProductEntityDto)
product?: AddOrderItemEntityProductEntityDto| null;

@IsOptional()
@Relation({entity:'PromoCodeEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddOrderItemEntityPromoCodeEntityDto)
appliedPromoCode?: AddOrderItemEntityPromoCodeEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddOrderItemEntityPromotionEntityDto)
appliedPromotions?: AddOrderItemEntityPromotionEntityDto[]| null;

@IsNumber()
brandOrderId: number;

@IsNumber()
productId: number;

@IsNumber()
variantId: number;

@IsNumber()
promoCodeId: number;
}
