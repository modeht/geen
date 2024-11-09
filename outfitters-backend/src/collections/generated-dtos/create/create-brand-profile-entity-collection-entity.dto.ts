import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { ProductEntity } from '../../../products/entities/product.entity'



export class AddBrandProfileEntityCollectionEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
name?: string | null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isFeatured?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isPublic?: boolean| null;

@IsNumber()
@IsOptional()
brandId?: number | null;
}
