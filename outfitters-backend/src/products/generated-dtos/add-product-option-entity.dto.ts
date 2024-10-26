import { IsString, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddProductOptionEntityProductEntityDto } from '../generated-dtos/add-product-option-entity-product-entity.dto';
import { AddProductOptionEntityProductOptionValueEntityDto } from '../generated-dtos/add-product-option-entity-product-option-value-entity.dto';
import { ProductOptionValueEntity } from '../entities/product-option-value.entity'
import { ProductEntity } from '../entities/product.entity'



export class AddProductOptionEntityDto {
@IsString()
name: string;

@IsNumber()
productId: number;

@IsOptional()
@ValidateNested()
@Type(() => AddProductOptionEntityProductEntityDto)
product?: AddProductOptionEntityProductEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductOptionEntityProductOptionValueEntityDto)
values?: AddProductOptionEntityProductOptionValueEntityDto[]| null;
}
