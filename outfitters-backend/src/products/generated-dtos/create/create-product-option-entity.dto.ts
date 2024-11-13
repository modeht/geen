import { IsString, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ProductOptionValueEntity } from '../../entities/product-option-value.entity'
import { ProductEntity } from '../../entities/product.entity'



export class CreateProductOptionEntityDto {
@IsString()
name: string;

@IsNumber()
productId: number;
}
