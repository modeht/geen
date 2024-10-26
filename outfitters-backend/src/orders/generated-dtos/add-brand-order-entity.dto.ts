import { IsEnum, IsNumber, IsOptional, IsString, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { OrderStatusEnum } from '../entities/brand-orders.entity'
import { AddBrandOrderEntityOrderItemEntityDto } from '../generated-dtos/add-brand-order-entity-order-item-entity.dto';
import { AddBrandOrderEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-brand-order-entity-brand-profile-entity.dto';
import { AddBrandOrderEntityOrderEntityDto } from '../generated-dtos/add-brand-order-entity-order-entity.dto';
import { OrderEntity } from '../entities/order.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { OrderItemEntity } from '../entities/order-item.entity'



export class AddBrandOrderEntityDto {
@IsEnum(OrderStatusEnum)
status: OrderStatusEnum;

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

@IsOptional()
@Relation({entity:'OrderItemEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddBrandOrderEntityOrderItemEntityDto)
items?: AddBrandOrderEntityOrderItemEntityDto[]| null;

@IsOptional()
@Relation({entity:'BrandProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddBrandOrderEntityBrandProfileEntityDto)
brand?: AddBrandOrderEntityBrandProfileEntityDto| null;

@IsOptional()
@Relation({entity:'OrderEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddBrandOrderEntityOrderEntityDto)
order?: AddBrandOrderEntityOrderEntityDto| null;

@IsNumber()
orderId: number;

@IsNumber()
brandId: number;
}
