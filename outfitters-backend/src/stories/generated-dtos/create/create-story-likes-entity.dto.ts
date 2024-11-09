import { IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddStoryLikesEntityUserEntityDto } from '../../../users/generated-dtos/create/create-story-likes-entity-user-entity.dto';
import { AddStoryLikesEntityStoryEntityDto } from '../../generated-dtos/create/create-story-likes-entity-story-entity.dto';
import { UserEntity } from '../../../users/entities/user.entity'
import { StoryEntity } from '../../entities/story.entity'



export class AddStoryLikesEntityDto {
@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddStoryLikesEntityUserEntityDto)
user?: AddStoryLikesEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'StoryEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddStoryLikesEntityStoryEntityDto)
story?: AddStoryLikesEntityStoryEntityDto| null;

@IsNumber()
userId: number;

@IsNumber()
storyId: number;
}
