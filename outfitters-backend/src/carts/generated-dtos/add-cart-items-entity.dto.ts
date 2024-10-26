import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddCartItemsEntityCartEntityDto } from '../generated-dtos/add-cart-items-entity-cart-entity.dto';
import { AddCartItemsEntityProductEntityDto } from '../../products/generated-dtos/add-cart-items-entity-product-entity.dto';
import { AddCartItemsEntityProductVariantEntityDto } from '../../products/generated-dtos/add-cart-items-entity-product-variant-entity.dto';
import { AddCartItemsEntityAffiliationLinkEntityDto } from '../../affiliation-links/generated-dtos/add-cart-items-entity-affiliation-link-entity.dto';
import { CartEntity } from '../entities/cart.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { ProductVariantEntity } from '../../products/entities/product-variant.entity'
import { AffiliationLinkEntity } from '../../affiliation-links/entities/affiliation-link.entity'



export class AddCartItemsEntityDto {
@IsNumber()
@IsOptional()
quantity?: number | null;

@IsOptional()
@ValidateNested()
@Type(() => AddCartItemsEntityCartEntityDto)
cart?: AddCartItemsEntityCartEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddCartItemsEntityProductEntityDto)
product?: AddCartItemsEntityProductEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddCartItemsEntityProductVariantEntityDto)
variant?: AddCartItemsEntityProductVariantEntityDto| null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddCartItemsEntityAffiliationLinkEntityDto)
affiliationLink?: AddCartItemsEntityAffiliationLinkEntityDto | null;

@IsNumber()
cartId: number;

@IsNumber()
productId: number;

@IsNumber()
variantId: number;

@IsNumber()
affiliationLinkId: number;

@IsNumber()
totalPrice: number;

@IsNumber()
totalDiscountedPrice: number;

@IsBoolean()
promoCodeApplied: boolean;

@IsNumber({},{each:true})
appliedpromotionsIds: number[];
}
