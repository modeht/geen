import { IsString, IsOptional, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { UserEntity } from '../../../users/entities/user.entity'
import { SavedCollectionItemEntity } from '../../entities/saved-collection-item.entity'



export class CreateSavedCollectionEntityDto {
@IsString()
@IsOptional()
name?: string | null;

@IsNumber()
userId: number;
}
