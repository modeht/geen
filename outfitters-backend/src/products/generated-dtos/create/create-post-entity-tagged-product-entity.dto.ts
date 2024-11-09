import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsNumber, IsOptional } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { PostEntity } from '../../../posts/entities/post.entity'
import { ProductEntity } from '../../entities/product.entity'



export class AddPostEntityTaggedProductEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
productId?: number | null;

@IsNumber()
@IsOptional()
postId?: number | null;

@IsNumber()
@IsOptional()
storyId?: number | null;

@IsNumber()
@IsOptional()
affiliationLinkId?: number | null;
}
