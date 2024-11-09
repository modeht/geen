import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { StoryLikesEntity } from '../../entities/stories-likes.entity'



export class AddUserEntityStoryEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
background?: string | null;

@IsString()
@IsOptional()
text?: string | null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postedById?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
taggedProductsCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
taggedUsersCount?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isLiked?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isViewed?: boolean| null;
}
