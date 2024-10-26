import { IsDate, IsBoolean, IsString, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddShippingAddressEntityOrderEntityDto } from '../../orders/generated-dtos/add-shipping-address-entity-order-entity.dto';
import { AddShippingAddressEntityShopperProfileEntityDto } from '../generated-dtos/add-shipping-address-entity-shopper-profile-entity.dto';
import { OrderEntity } from '../../orders/entities/order.entity'
import { ShopperProfileEntity } from '../entities/shopper-profile.entity'



export class AddShippingAddressEntityDto {
@IsDate()
@Type(()=>Date)
deletedAt: Date;

@IsBoolean()
isDefault: boolean;

@IsString()
name: string;

@IsString()
country: string;

@IsString()
city: string;

@IsString()
street: string;

@IsString()
apartment: string;

@IsString()
address: string;

@IsString()
floor: string;

@IsString()
building: string;

@IsString()
latitude: string;

@IsString()
longitude: string;

@IsOptional()
@IsOptional()
@Relation({entity:'OrderEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddShippingAddressEntityOrderEntityDto)
orders?: AddShippingAddressEntityOrderEntityDto[] | null;

@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddShippingAddressEntityShopperProfileEntityDto)
shopperProfile?: AddShippingAddressEntityShopperProfileEntityDto| null;

@IsNumber()
shopperId: number;
}
