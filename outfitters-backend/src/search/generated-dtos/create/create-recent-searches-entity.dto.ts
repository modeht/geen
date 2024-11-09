import { IsString, IsOptional, IsEnum, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { searchMode } from '../../entities/recent-searches.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class AddRecentSearchesEntityDto {
@IsString()
@IsOptional()
keyword?: string | null;

@IsNumber()
userId: number;
}
