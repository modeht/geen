import { ProductEntity } from 'src/products/entities/product.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsNumber, IsOptional, IsBoolean, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { AffiliationLinkTrackingEntity } from '../entities/affiliation-link-tracking.entity'
import { CartItemsEntity } from '../../carts/entities/cart-item.entity'



export class AddTaggedProductEntityAffiliationLinkEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isDisabled?: boolean| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
url?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
shopperId?: number| null;
}
