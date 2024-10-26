import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, ValidateNested, IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddCountryEntityMediaEntityDto } from '../../media/generated-dtos/add-country-entity-media-entity.dto';
import { AddCountryEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-country-entity-brand-profile-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'



export class AddCountryEntityDto {
@IsString()
name: string;

@IsString()
code: string;

@IsString()
dialCode: string;

@IsBoolean()
isSupported: boolean;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddCountryEntityMediaEntityDto)
icon?: AddCountryEntityMediaEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCountryEntityBrandProfileEntityDto)
brands?: AddCountryEntityBrandProfileEntityDto[]| null;

@IsNumber()
iconId: number;
}
