import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CartEntity } from '../../entities/cart.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { ProductVariantEntity } from '../../../products/entities/product-variant.entity'
import { AffiliationLinkEntity } from '../../../affiliation-links/entities/affiliation-link.entity'



export class AddCartEntityCartItemsEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
quantity?: number | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
cartId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
variantId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
affiliationLinkId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
totalPrice?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
totalDiscountedPrice?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
promoCodeApplied?: boolean| null;

@IsNumber({},{each:true})
@IsOptionalIf((obj,_)=>!!obj.id)
appliedpromotionsIds?: number[]| null;
}
