import { IsOptional, IsNumber, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity'
import { ProductEntity } from '../../entities/product.entity'



export class AddProductReviewEntityDto {
@IsNumber()
@IsOptional()
stars?: number | null;

@IsString()
@IsOptional()
comment?: string | null;

@IsNumber()
productId: number;

@IsNumber()
shopperId: number;
}
