import { IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddPostLikesEntityUserEntityDto } from '../../../users/generated-dtos/create/create-post-likes-entity-user-entity.dto';
import { AddPostLikesEntityPostEntityDto } from '../../generated-dtos/create/create-post-likes-entity-post-entity.dto';
import { UserEntity } from '../../../users/entities/user.entity'
import { PostEntity } from '../../entities/post.entity'



export class AddPostLikesEntityDto {
@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddPostLikesEntityUserEntityDto)
user?: AddPostLikesEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'PostEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddPostLikesEntityPostEntityDto)
post?: AddPostLikesEntityPostEntityDto| null;

@IsNumber()
userId: number;

@IsNumber()
postId: number;
}
