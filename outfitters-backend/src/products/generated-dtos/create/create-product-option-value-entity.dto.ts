import { IsString, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ProductOptionEntity } from '../../entities/product-option.entity'
import { ProductVariantEntity } from '../../entities/product-variant.entity'



export class AddProductOptionValueEntityDto {
@IsString()
value: string;

@IsString()
optionName: string;

@IsNumber()
productId: number;
}
