import { IsBoolean, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddConversationEntityUserEntityDto } from '../../users/generated-dtos/add-conversation-entity-user-entity.dto';
import { AddConversationEntityMessageEntityDto } from '../../messages/generated-dtos/add-conversation-entity-message-entity.dto';
import { MessageEntity } from '../../messages/entities/message.entity'
import { UserEntity } from '../../users/entities/user.entity'



export class AddConversationEntityDto {
@IsBoolean()
isSupport: boolean;

@IsOptional()
@ValidateNested()
@Type(() => AddConversationEntityUserEntityDto)
from?: AddConversationEntityUserEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddConversationEntityUserEntityDto)
to?: AddConversationEntityUserEntityDto| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddConversationEntityMessageEntityDto)
messages?: AddConversationEntityMessageEntityDto[] | null;

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
