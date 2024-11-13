import { IsOptional, IsEnum, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { OrderPaymentMethod } from '../../entities/order.entity'
import { OrderPaymentStatusEnum } from '../../entities/order.entity'
import { ShippingAddressEntity } from '../../../users/entities/shipping-address.entity'
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../../carts/entities/cart.entity'
import { BrandOrderEntity } from '../../entities/brand-orders.entity'



export class CreateOrderEntityDto {
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
cartId: number;

@IsNumber()
shippingAddressId: number;

@IsNumber()
shopperId: number;
}
