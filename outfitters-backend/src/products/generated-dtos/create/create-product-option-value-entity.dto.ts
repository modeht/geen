import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddProductOptionValueEntityProductOptionEntityDto } from '../../generated-dtos/create/create-product-option-value-entity-product-option-entity.dto';
import { AddProductOptionValueEntityProductVariantEntityDto } from '../../generated-dtos/create/create-product-option-value-entity-product-variant-entity.dto';
import { ProductOptionEntity } from '../../entities/product-option.entity'
import { ProductVariantEntity } from '../../entities/product-variant.entity'



export class AddProductOptionValueEntityDto {
@IsString()
value: string;

@IsString()
optionName: string;

@IsNumber()
productId: number;

@IsOptional()
@Relation({entity:'ProductOptionEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductOptionValueEntityProductOptionEntityDto)
option?: AddProductOptionValueEntityProductOptionEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductOptionValueEntityProductVariantEntityDto)
variants?: AddProductOptionValueEntityProductVariantEntityDto[]| null;
}
