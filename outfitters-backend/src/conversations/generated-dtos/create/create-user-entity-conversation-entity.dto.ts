import { IsNumber, IsOptional, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MessageEntity } from '../../../messages/entities/message.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class AddUserEntityConversationEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isSupport?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
archivedByFrom?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
archivedByTo?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
fromId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
toId?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isCollaboration?: boolean| null;
}
