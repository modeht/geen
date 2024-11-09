import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { UserEntity } from '../../../users/entities/user.entity'
import { SavedCollectionItemEntity } from '../../entities/saved-collection-item.entity'



export class AddSavedCollectionItemEntitySavedCollectionEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
name?: string | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;
}
