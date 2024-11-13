import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { ProductEntity } from '../../../products/entities/product.entity'



export class CreateCollectionEntityDto {
@IsString()
@IsOptional()
name?: string | null;

@IsBoolean()
isFeatured: boolean;

@IsBoolean()
isPublic: boolean;

@IsNumber()
@IsOptional()
brandId?: number | null;
}
