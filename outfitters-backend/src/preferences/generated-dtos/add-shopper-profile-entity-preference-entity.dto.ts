import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'



export class AddShopperProfileEntityPreferenceEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
name?: string | null;

@IsNumber()
@IsOptional()
mediaId?: number | null;
}
