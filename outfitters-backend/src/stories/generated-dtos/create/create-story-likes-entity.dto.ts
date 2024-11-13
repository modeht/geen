import { IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { UserEntity } from '../../../users/entities/user.entity'
import { StoryEntity } from '../../entities/story.entity'



export class CreateStoryLikesEntityDto {
@IsNumber()
userId: number;

@IsNumber()
storyId: number;
}
