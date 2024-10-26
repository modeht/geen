import { ProductEntity } from 'src/products/entities/product.entity';
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { SeasonalPromotionEntity } from '../../promotions/entities/seasonal-promotion.entity'



export class AddMediaEntityCategoryEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
name?: string| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isArchived?: boolean| null;

@IsNumber()
@IsOptional()
superCategoryId?: number | null;
}
