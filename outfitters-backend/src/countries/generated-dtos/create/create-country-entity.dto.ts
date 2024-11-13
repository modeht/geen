import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { BrandProfileEntity } from '../../../users/entities/brand-profile.entity'



export class CreateCountryEntityDto {
@IsString()
name: string;

@IsString()
code: string;

@IsString()
dialCode: string;

@IsBoolean()
isSupported: boolean;

@IsNumber()
iconId: number;
}
