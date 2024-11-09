import { IsNumber, IsOptional } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { UserEntity } from '../../../users/entities/user.entity'
import { PostEntity } from '../../entities/post.entity'



export class AddPostEntityPostLikesEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postId?: number| null;
}
