import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'



export class AddMediaEntityCountryEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
name?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
code?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
dialCode?: string| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isSupported?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
iconId?: number| null;
}
