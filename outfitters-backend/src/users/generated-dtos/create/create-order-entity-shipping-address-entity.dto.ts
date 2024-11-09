import { IsNumber, IsOptional, IsDate, IsBoolean, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { OrderEntity } from '../../../orders/entities/order.entity'
import { ShopperProfileEntity } from '../../entities/shopper-profile.entity'



export class AddOrderEntityShippingAddressEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
deletedAt?: Date| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isDefault?: boolean| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
name?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
country?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
city?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
street?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
apartment?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
address?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
floor?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
building?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
latitude?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
longitude?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
shopperId?: number| null;
}
