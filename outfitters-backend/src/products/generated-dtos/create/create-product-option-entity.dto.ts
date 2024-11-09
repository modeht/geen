import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddProductOptionEntityProductEntityDto } from '../../generated-dtos/create/create-product-option-entity-product-entity.dto';
import { AddProductOptionEntityProductOptionValueEntityDto } from '../../generated-dtos/create/create-product-option-entity-product-option-value-entity.dto';
import { ProductOptionValueEntity } from '../../entities/product-option-value.entity'
import { ProductEntity } from '../../entities/product.entity'



export class AddProductOptionEntityDto {
@IsString()
name: string;

@IsNumber()
productId: number;

@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductOptionEntityProductEntityDto)
product?: AddProductOptionEntityProductEntityDto| null;

@IsOptional()
@Relation({entity:'ProductOptionValueEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductOptionEntityProductOptionValueEntityDto)
values?: AddProductOptionEntityProductOptionValueEntityDto[]| null;
}
