import { IsBoolean, IsOptional, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MessageEntity } from '../../../messages/entities/message.entity'
import { UserEntity } from '../../../users/entities/user.entity'



export class CreateConversationEntityDto {
@IsBoolean()
isSupport: boolean;

@IsBoolean()
archivedByFrom: boolean;

@IsBoolean()
archivedByTo: boolean;

@IsNumber()
fromId: number;

@IsNumber()
toId: number;

@IsBoolean()
isCollaboration: boolean;
}
