//@ts-nocheck
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollectionEntity } from '../../collections/entities/collection.entity';
import { CountryEntity } from '../../countries/entities/countries.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { PreferenceEntity } from '../../preferences/entities/preference.entity';
import { ProductReviewEntity } from '../../products/entities/product-review.entity';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StoryEntity } from '../../stories/entities/story.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import * as v from "class-validator";
import * as t from "class-transformer";



export class AddMediaEntityDto {
@v.IsDate()
@t.Type(()=>Date)
createdAt: Date;

@v.IsDate()
@t.Type(()=>Date)
updatedAt: Date;


preference: PreferenceEntity;


collectionCover: CollectionEntity;


user: ShopperProfileEntity;


story: StoryEntity;


brandStoreCover: BrandProfileEntity;


brandStoreLogo: BrandProfileEntity;


category: CategoryEntity;


country: CountryEntity;


postThumbnail: PostEntity;

@v.IsOptional()
product?: ProductEntity | null;

@v.IsOptional()
productVariant?: ProductVariantEntity | null;

@v.IsOptional()
message?: MessageEntity | null;

@v.IsOptional()
post?: PostEntity | null;


review: ProductReviewEntity;

@v.IsString()
@v.IsOptional()
mimetype?: string | null;

@v.IsString()
@v.IsOptional()
url?: string | null;

@v.IsNumber()
@v.IsOptional()
size?: number | null;

@v.IsNumber()
@v.IsOptional()
width?: number | null;

@v.IsNumber()
@v.IsOptional()
height?: number | null;
}
