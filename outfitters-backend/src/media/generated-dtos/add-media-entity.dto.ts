import { IsOptional, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddMediaEntityPreferenceEntityDto } from '../../preferences/generated-dtos/add-media-entity-preference-entity.dto';
import { AddMediaEntityCollectionEntityDto } from '../../collections/generated-dtos/add-media-entity-collection-entity.dto';
import { AddMediaEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-media-entity-shopper-profile-entity.dto';
import { AddMediaEntityStoryEntityDto } from '../../stories/generated-dtos/add-media-entity-story-entity.dto';
import { AddMediaEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-media-entity-brand-profile-entity.dto';
import { AddMediaEntityCategoryEntityDto } from '../../categories/generated-dtos/add-media-entity-category-entity.dto';
import { AddMediaEntityCountryEntityDto } from '../../countries/generated-dtos/add-media-entity-country-entity.dto';
import { AddMediaEntityPostEntityDto } from '../../posts/generated-dtos/add-media-entity-post-entity.dto';
import { AddMediaEntityProductEntityDto } from '../../products/generated-dtos/add-media-entity-product-entity.dto';
import { AddMediaEntityProductVariantEntityDto } from '../../products/generated-dtos/add-media-entity-product-variant-entity.dto';
import { AddMediaEntityMessageEntityDto } from '../../messages/generated-dtos/add-media-entity-message-entity.dto';
import { AddMediaEntityProductReviewEntityDto } from '../../products/generated-dtos/add-media-entity-product-review-entity.dto';
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

export class AddMediaEntityDto {
	@IsOptional()
	@Relation({ entity: 'PreferenceEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityPreferenceEntityDto)
	preference?: AddMediaEntityPreferenceEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'CollectionEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityCollectionEntityDto)
	collectionCover?: AddMediaEntityCollectionEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'ShopperProfileEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityShopperProfileEntityDto)
	user?: AddMediaEntityShopperProfileEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'StoryEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityStoryEntityDto)
	story?: AddMediaEntityStoryEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'BrandProfileEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityBrandProfileEntityDto)
	brandStoreCover?: AddMediaEntityBrandProfileEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'BrandProfileEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityBrandProfileEntityDto)
	brandStoreLogo?: AddMediaEntityBrandProfileEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'CategoryEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityCategoryEntityDto)
	category?: AddMediaEntityCategoryEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'CountryEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityCountryEntityDto)
	country?: AddMediaEntityCountryEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'PostEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityPostEntityDto)
	postThumbnail?: AddMediaEntityPostEntityDto | null;

	@IsOptional()
	@IsOptional()
	@Relation({ entity: 'ProductEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityProductEntityDto)
	product?: AddMediaEntityProductEntityDto | null;

	@IsOptional()
	@IsOptional()
	@Relation({ entity: 'ProductVariantEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityProductVariantEntityDto)
	productVariant?: AddMediaEntityProductVariantEntityDto | null;

	@IsOptional()
	@IsOptional()
	@Relation({ entity: 'MessageEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityMessageEntityDto)
	message?: AddMediaEntityMessageEntityDto | null;

	@IsOptional()
	@IsOptional()
	@Relation({ entity: 'PostEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityPostEntityDto)
	post?: AddMediaEntityPostEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'ProductReviewEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddMediaEntityProductReviewEntityDto)
	review?: AddMediaEntityProductReviewEntityDto | null;

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
