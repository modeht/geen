import { IsNumber, IsOptional, IsEnum } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CartStatus } from '../../entities/cart.entity'
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity'
import { CartItemsEntity } from '../../entities/cart-item.entity'
import { PromoCodeEntity } from '../../../promotions/entities/promo-code.entity'
import { OrderEntity } from '../../../orders/entities/order.entity'



export class AddOrderEntityCartEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
promoCodeId?: number | null;

@IsNumber()
@IsOptional()
shopperId?: number | null;
}
