import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { ProductOptionEntity } from '../entities/product-option.entity'
import { ProductVariantEntity } from '../entities/product-variant.entity'



export class AddProductOptionEntityProductOptionValueEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
value?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
optionName?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;
}
