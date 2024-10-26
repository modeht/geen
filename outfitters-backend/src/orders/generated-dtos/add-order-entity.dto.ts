import { IsOptional, IsEnum, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { OrderPaymentMethod } from '../entities/order.entity'
import { OrderPaymentStatusEnum } from '../entities/order.entity'
import { AddOrderEntityCartEntityDto } from '../../carts/generated-dtos/add-order-entity-cart-entity.dto';
import { AddOrderEntityBrandOrderEntityDto } from '../generated-dtos/add-order-entity-brand-order-entity.dto';
import { AddOrderEntityShippingAddressEntityDto } from '../../users/generated-dtos/add-order-entity-shipping-address-entity.dto';
import { AddOrderEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-order-entity-shopper-profile-entity.dto';
import { ShippingAddressEntity } from '../../users/entities/shipping-address.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../carts/entities/cart.entity'
import { BrandOrderEntity } from '../entities/brand-orders.entity'



export class AddOrderEntityDto {
@IsOptional()
transactions?: Record<string, any> | null;

@IsEnum(OrderPaymentMethod)
paymentMethod: OrderPaymentMethod;

@IsOptional()
@IsEnum(OrderPaymentStatusEnum )
@IsEnum( null)
paymentStatus?: OrderPaymentStatusEnum | null;

@IsNumber()
@IsOptional()
totalSalePrice?: number | null;

@IsNumber()
@IsOptional()
totalPurchasePrice?: number | null;

@IsNumber()
@IsOptional()
totalShippingFees?: number | null;

@IsOptional()
@Relation({entity:'CartEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddOrderEntityCartEntityDto)
cart?: AddOrderEntityCartEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddOrderEntityBrandOrderEntityDto)
brandOrders?: AddOrderEntityBrandOrderEntityDto[]| null;

@IsOptional()
@ValidateNested()
@Type(() => AddOrderEntityShippingAddressEntityDto)
shippingAddress?: AddOrderEntityShippingAddressEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddOrderEntityShopperProfileEntityDto)
shopperProfile?: AddOrderEntityShopperProfileEntityDto| null;

@IsNumber()
cartId: number;

@IsNumber()
shippingAddressId: number;

@IsNumber()
shopperId: number;
}
