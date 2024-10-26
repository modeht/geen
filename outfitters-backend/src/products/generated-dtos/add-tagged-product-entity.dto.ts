import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddTaggedProductEntityProductEntityDto } from '../generated-dtos/add-tagged-product-entity-product-entity.dto';
import { AddTaggedProductEntityPostEntityDto } from '../../posts/generated-dtos/add-tagged-product-entity-post-entity.dto';
import { AddTaggedProductEntityStoryEntityDto } from '../../stories/generated-dtos/add-tagged-product-entity-story-entity.dto';
import { AddTaggedProductEntityAffiliationLinkEntityDto } from '../../affiliation-links/generated-dtos/add-tagged-product-entity-affiliation-link-entity.dto';
import { PostEntity } from '../../posts/entities/post.entity'
import { ProductEntity } from '../entities/product.entity'



export class AddTaggedProductEntityDto {
@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddTaggedProductEntityProductEntityDto)
product?: AddTaggedProductEntityProductEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddTaggedProductEntityPostEntityDto)
post?: AddTaggedProductEntityPostEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddTaggedProductEntityStoryEntityDto)
story?: AddTaggedProductEntityStoryEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddTaggedProductEntityAffiliationLinkEntityDto)
affiliationLink?: AddTaggedProductEntityAffiliationLinkEntityDto | null;

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
