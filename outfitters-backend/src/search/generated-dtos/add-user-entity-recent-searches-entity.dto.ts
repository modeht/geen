import { IsNumber, IsOptional, IsString, IsEnum } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { searchMode } from '../entities/recent-searches.entity'
import { UserEntity } from '../../users/entities/user.entity'



export class AddUserEntityRecentSearchesEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
keyword?: string | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;
}
