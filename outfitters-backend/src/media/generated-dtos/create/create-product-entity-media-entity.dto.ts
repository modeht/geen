import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CategoryEntity } from '../../../categories/entities/category.entity'
import { CollectionEntity } from '../../../collections/entities/collection.entity'
import { CountryEntity } from '../../../countries/entities/countries.entity'
import { MessageEntity } from '../../../messages/entities/message.entity'
import { PostEntity } from '../../../posts/entities/post.entity'
import { PreferenceEntity } from '../../../preferences/entities/preference.entity'
import { ProductReviewEntity } from '../../../products/entities/product-review.entity'
import { ProductVariantEntity } from '../../../products/entities/product-variant.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { StoryEntity } from '../../../stories/entities/story.entity'
import { BrandProfileEntity } from '../../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity'



export class AddProductEntityMediaEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
mimetype?: string | null;

@IsString()
@IsOptional()
url?: string | null;

@IsNumber()
@IsOptional()
size?: number | null;

@IsNumber()
@IsOptional()
width?: number | null;

@IsNumber()
@IsOptional()
height?: number | null;
}
