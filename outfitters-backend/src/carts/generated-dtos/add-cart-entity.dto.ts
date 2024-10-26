import { IsEnum, IsOptional, ValidateNested, IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { CartStatus } from '../entities/cart.entity'
import { AddCartEntityOrderEntityDto } from '../../orders/generated-dtos/add-cart-entity-order-entity.dto';
import { AddCartEntityCartItemsEntityDto } from '../generated-dtos/add-cart-entity-cart-items-entity.dto';
import { AddCartEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-cart-entity-shopper-profile-entity.dto';
import { AddCartEntityPromoCodeEntityDto } from '../../promotions/generated-dtos/add-cart-entity-promo-code-entity.dto';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { CartItemsEntity } from '../entities/cart-item.entity'
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity'
import { OrderEntity } from '../../orders/entities/order.entity'



export class AddCartEntityDto {
@IsEnum(CartStatus)
status: CartStatus;

@IsOptional()
@Relation({entity:'OrderEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCartEntityOrderEntityDto)
order?: AddCartEntityOrderEntityDto| null;

@IsOptional()
@Relation({entity:'CartItemsEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCartEntityCartItemsEntityDto)
items?: AddCartEntityCartItemsEntityDto[]| null;

@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCartEntityShopperProfileEntityDto)
shopperProfile?: AddCartEntityShopperProfileEntityDto| null;

@IsOptional()
@Relation({entity:'PromoCodeEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCartEntityPromoCodeEntityDto)
promoCode?: AddCartEntityPromoCodeEntityDto| null;

@IsNumber()
@IsOptional()
promoCodeId?: number | null;

@IsNumber()
@IsOptional()
shopperId?: number | null;
}
