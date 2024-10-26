import { IsString, IsOptional, IsEnum, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { searchMode } from '../entities/recent-searches.entity'
import { AddRecentSearchesEntityUserEntityDto } from '../../users/generated-dtos/add-recent-searches-entity-user-entity.dto';
import { UserEntity } from '../../users/entities/user.entity'



export class AddRecentSearchesEntityDto {
@IsString()
@IsOptional()
keyword?: string | null;

@IsEnum(searchMode)
mode: searchMode;

@IsOptional()
@ValidateNested()
@Type(() => AddRecentSearchesEntityUserEntityDto)
user?: AddRecentSearchesEntityUserEntityDto| null;

@IsNumber()
userId: number;
}
