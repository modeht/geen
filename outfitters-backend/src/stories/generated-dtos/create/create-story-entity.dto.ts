import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { StoryLikesEntity } from '../../entities/stories-likes.entity'



export class CreateStoryEntityDto {
@IsString()
@IsOptional()
background?: string | null;

@IsString()
@IsOptional()
text?: string | null;

@IsNumber()
postedById: number;

@IsNumber()
taggedProductsCount: number;

@IsNumber()
taggedUsersCount: number;

@IsBoolean()
isLiked: boolean;

@IsBoolean()
isViewed: boolean;
}
