import { IsDate, IsBoolean, IsString, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { OrderEntity } from '../../../orders/entities/order.entity'
import { ShopperProfileEntity } from '../../entities/shopper-profile.entity'



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

@IsNumber()
shopperId: number;
}
