import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CartEntity } from '../../entities/cart.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { ProductVariantEntity } from '../../../products/entities/product-variant.entity'
import { AffiliationLinkEntity } from '../../../affiliation-links/entities/affiliation-link.entity'



export class CreateCartItemsEntityDto {
@IsNumber()
@IsOptional()
quantity?: number | null;

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
