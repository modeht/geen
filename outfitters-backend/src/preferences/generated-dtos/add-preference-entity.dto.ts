import { IsOptional, ValidateNested, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddPreferenceEntityMediaEntityDto } from '../../media/generated-dtos/add-preference-entity-media-entity.dto';
import { AddPreferenceEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-preference-entity-brand-profile-entity.dto';
import { AddPreferenceEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-preference-entity-shopper-profile-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'



export class AddPreferenceEntityDto {
@IsOptional()
@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddPreferenceEntityMediaEntityDto)
media?: AddPreferenceEntityMediaEntityDto | null;

@IsString()
@IsOptional()
name?: string | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPreferenceEntityBrandProfileEntityDto)
brandProfile?: AddPreferenceEntityBrandProfileEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPreferenceEntityShopperProfileEntityDto)
shopperProfile?: AddPreferenceEntityShopperProfileEntityDto[] | null;

@IsNumber()
@IsOptional()
mediaId?: number | null;
}
