import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional, ValidateNested, IsArray, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddStoryEntityMediaEntityDto } from '../../media/generated-dtos/add-story-entity-media-entity.dto';
import { AddStoryEntityTaggedProductEntityDto } from '../../products/generated-dtos/add-story-entity-tagged-product-entity.dto';
import { AddStoryEntityUserEntityDto } from '../../users/generated-dtos/add-story-entity-user-entity.dto';
import { AddStoryEntityStoryLikesEntityDto } from '../generated-dtos/add-story-entity-story-likes-entity.dto';
import { AddStoryEntityMessageEntityDto } from '../../messages/generated-dtos/add-story-entity-message-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { StoryLikesEntity } from '../entities/stories-likes.entity'



export class AddStoryEntityDto {
@IsString()
@IsOptional()
background?: string | null;

@IsString()
@IsOptional()
text?: string | null;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddStoryEntityMediaEntityDto)
media?: AddStoryEntityMediaEntityDto | null;

@IsOptional()
@Relation({entity:'TaggedProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddStoryEntityTaggedProductEntityDto)
taggedProducts?: AddStoryEntityTaggedProductEntityDto[] | null;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddStoryEntityUserEntityDto)
postedBy?: AddStoryEntityUserEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddStoryEntityUserEntityDto)
taggedUsers?: AddStoryEntityUserEntityDto[] | null;

@IsOptional()
@Relation({entity:'StoryLikesEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddStoryEntityStoryLikesEntityDto)
likedByUsers?: AddStoryEntityStoryLikesEntityDto[] | null;

@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddStoryEntityMessageEntityDto)
shares?: AddStoryEntityMessageEntityDto[] | null;

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
