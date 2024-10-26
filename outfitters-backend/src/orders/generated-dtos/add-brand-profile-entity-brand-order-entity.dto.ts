import { IsNumber, IsOptional, IsEnum, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { OrderStatusEnum } from '../entities/brand-orders.entity'
import { OrderEntity } from '../entities/order.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { OrderItemEntity } from '../entities/order-item.entity'



export class AddBrandProfileEntityBrandOrderEntityDto {
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
shippingFees?: number | null;

@IsNumber()
@IsOptional()
rating?: number | null;

@IsString()
@IsOptional()
review?: string | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
expectedDeliveryDate?: Date | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
acceptedAt?: Date | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
shippedAt?: Date | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
deliveredAt?: Date | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
cancelledAt?: Date | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
orderId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
brandId?: number| null;
}
