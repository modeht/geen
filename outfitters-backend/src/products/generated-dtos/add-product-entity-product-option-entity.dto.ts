import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { ProductOptionValueEntity } from '../entities/product-option-value.entity'
import { ProductEntity } from '../entities/product.entity'



export class AddProductEntityProductOptionEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
name?: string| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;
}
