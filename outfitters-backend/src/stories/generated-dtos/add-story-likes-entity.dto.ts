import { IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddStoryLikesEntityUserEntityDto } from '../../users/generated-dtos/add-story-likes-entity-user-entity.dto';
import { AddStoryLikesEntityStoryEntityDto } from '../generated-dtos/add-story-likes-entity-story-entity.dto';
import { UserEntity } from '../../users/entities/user.entity'
import { StoryEntity } from '../entities/story.entity'



export class AddStoryLikesEntityDto {
@IsOptional()
@ValidateNested()
@Type(() => AddStoryLikesEntityUserEntityDto)
user?: AddStoryLikesEntityUserEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddStoryLikesEntityStoryEntityDto)
story?: AddStoryLikesEntityStoryEntityDto| null;

@IsNumber()
userId: number;

@IsNumber()
storyId: number;
}
