import { IsString, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddSavedCollectionEntitySavedCollectionItemEntityDto } from '../../generated-dtos/create/create-saved-collection-entity-saved-collection-item-entity.dto';
import { AddSavedCollectionEntityUserEntityDto } from '../../../users/generated-dtos/create/create-saved-collection-entity-user-entity.dto';
import { UserEntity } from '../../../users/entities/user.entity'
import { SavedCollectionItemEntity } from '../../entities/saved-collection-item.entity'



export class AddSavedCollectionEntityDto {
@IsString()
@IsOptional()
name?: string | null;

@IsOptional()
@Relation({entity:'SavedCollectionItemEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddSavedCollectionEntitySavedCollectionItemEntityDto)
items?: AddSavedCollectionEntitySavedCollectionItemEntityDto[]| null;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddSavedCollectionEntityUserEntityDto)
user?: AddSavedCollectionEntityUserEntityDto| null;

@IsNumber()
userId: number;
}
