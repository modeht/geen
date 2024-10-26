import { ProductEntity } from 'src/products/entities/product.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsBoolean, IsString, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddAffiliationLinkEntityTaggedProductEntityDto } from '../../products/generated-dtos/add-affiliation-link-entity-tagged-product-entity.dto';
import { AddAffiliationLinkEntityCartItemsEntityDto } from '../../carts/generated-dtos/add-affiliation-link-entity-cart-items-entity.dto';
import { AddAffiliationLinkEntityAffiliationLinkTrackingEntityDto } from '../generated-dtos/add-affiliation-link-entity-affiliation-link-tracking-entity.dto';
import { AddAffiliationLinkEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-affiliation-link-entity-shopper-profile-entity.dto';
import { AddAffiliationLinkEntityProductEntityDto } from '../../products/generated-dtos/add-affiliation-link-entity-product-entity.dto';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { AffiliationLinkTrackingEntity } from '../entities/affiliation-link-tracking.entity'
import { CartItemsEntity } from '../../carts/entities/cart-item.entity'



export class AddAffiliationLinkEntityDto {
@IsBoolean()
isDisabled: boolean;

@IsString()
url: string;

@IsOptional()
@IsOptional()
@Relation({entity:'TaggedProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddAffiliationLinkEntityTaggedProductEntityDto)
taggedProducts?: AddAffiliationLinkEntityTaggedProductEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CartItemsEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddAffiliationLinkEntityCartItemsEntityDto)
cartItems?: AddAffiliationLinkEntityCartItemsEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'AffiliationLinkTrackingEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddAffiliationLinkEntityAffiliationLinkTrackingEntityDto)
affiliationLinkTracking?: AddAffiliationLinkEntityAffiliationLinkTrackingEntityDto[] | null;

@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddAffiliationLinkEntityShopperProfileEntityDto)
shopperProfile?: AddAffiliationLinkEntityShopperProfileEntityDto| null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddAffiliationLinkEntityProductEntityDto)
product?: AddAffiliationLinkEntityProductEntityDto| null;

@IsNumber()
productId: number;

@IsNumber()
shopperId: number;
}
