import { IsNumber, IsOptional, IsEnum } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { OrderPaymentMethod } from '../entities/order.entity'
import { OrderPaymentStatusEnum } from '../entities/order.entity'
import { ShippingAddressEntity } from '../../users/entities/shipping-address.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../carts/entities/cart.entity'
import { BrandOrderEntity } from '../entities/brand-orders.entity'



export class AddShippingAddressEntityOrderEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
totalSalePrice?: number | null;

@IsNumber()
@IsOptional()
totalPurchasePrice?: number | null;

@IsNumber()
@IsOptional()
totalShippingFees?: number | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
cartId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
shippingAddressId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
shopperId?: number| null;
}
