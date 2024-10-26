import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsBoolean, IsString, IsOptional, IsNumber, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddProductEntityMediaEntityDto } from '../../media/generated-dtos/add-product-entity-media-entity.dto';
import { AddProductEntityProductVariantEntityDto } from '../generated-dtos/add-product-entity-product-variant-entity.dto';
import { AddProductEntityProductOptionEntityDto } from '../generated-dtos/add-product-entity-product-option-entity.dto';
import { AddProductEntityProductReviewEntityDto } from '../generated-dtos/add-product-entity-product-review-entity.dto';
import { AddProductEntityTaggedProductEntityDto } from '../generated-dtos/add-product-entity-tagged-product-entity.dto';
import { AddProductEntityAffiliationLinkEntityDto } from '../../affiliation-links/generated-dtos/add-product-entity-affiliation-link-entity.dto';
import { AddProductEntityNotificationEntityDto } from '../../notifications/generated-dtos/add-product-entity-notification-entity.dto';
import { AddProductEntityOrderItemEntityDto } from '../../orders/generated-dtos/add-product-entity-order-item-entity.dto';
import { AddProductEntityMessageEntityDto } from '../../messages/generated-dtos/add-product-entity-message-entity.dto';
import { AddProductEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-product-entity-brand-profile-entity.dto';
import { AddProductEntityCategoryEntityDto } from '../../categories/generated-dtos/add-product-entity-category-entity.dto';
import { AddProductEntityCollectionEntityDto } from '../../collections/generated-dtos/add-product-entity-collection-entity.dto';
import { AddProductEntityCartItemsEntityDto } from '../../carts/generated-dtos/add-product-entity-cart-items-entity.dto';
import { AddProductEntityPromotionEntityDto } from '../../promotions/generated-dtos/add-product-entity-promotion-entity.dto';
import { AddProductEntityPromoCodeEntityDto } from '../../promotions/generated-dtos/add-product-entity-promo-code-entity.dto';
import { AddProductEntitySavedCollectionItemEntityDto } from '../../saved-collections/generated-dtos/add-product-entity-saved-collection-item-entity.dto';
import { CollectionEntity } from '../../collections/entities/collection.entity'
import { MediaEntity } from '../../media/entities/media.entity'
import { MessageEntity } from '../../messages/entities/message.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { PromotionEntity } from '../../promotions/entities/promotion.entity'
import { ProductOptionEntity } from '../entities/product-option.entity'
import { ProductReviewEntity } from '../entities/product-review.entity'
import { ProductVariantEntity } from '../entities/product-variant.entity'
import { TaggedProductEntity } from '../entities/tagged-product.entity'
import { SavedCollectionItemEntity } from '../../saved-collections/entities/saved-collection-item.entity'
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity'
import { CartItemsEntity } from '../../carts/entities/cart-item.entity'



export class AddProductEntityDto {
@IsBoolean()
isArchived: boolean;

@IsString()
@IsOptional()
title?: string | null;

@IsString()
@IsOptional()
description?: string | null;

@IsNumber()
@IsOptional()
basePrice?: number | null;

@IsString()
@IsOptional()
sku?: string | null;

@IsString()
@IsOptional()
currency?: string | null;

@IsNumber()
stock: number;

@IsDate()
@Type(()=>Date)
@IsOptional()
lastStockUpdate?: Date | null;

@IsBoolean()
isOutOfStock: boolean;

@IsBoolean()
isFeatured: boolean;

@IsNumber()
deliveryEstimationInDays: number;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityMediaEntityDto)
media?: AddProductEntityMediaEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityProductVariantEntityDto)
variants?: AddProductEntityProductVariantEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityProductOptionEntityDto)
options?: AddProductEntityProductOptionEntityDto[]| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityProductReviewEntityDto)
ratings?: AddProductEntityProductReviewEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityTaggedProductEntityDto)
taggedIn?: AddProductEntityTaggedProductEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityAffiliationLinkEntityDto)
affiliationLinks?: AddProductEntityAffiliationLinkEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityNotificationEntityDto)
notifications?: AddProductEntityNotificationEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityOrderItemEntityDto)
orderItems?: AddProductEntityOrderItemEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityMessageEntityDto)
messages?: AddProductEntityMessageEntityDto[]| null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddProductEntityBrandProfileEntityDto)
brand?: AddProductEntityBrandProfileEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddProductEntityCategoryEntityDto)
category?: AddProductEntityCategoryEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested()
@Type(() => AddProductEntityCategoryEntityDto)
subCategory?: AddProductEntityCategoryEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityCollectionEntityDto)
collections?: AddProductEntityCollectionEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityCartItemsEntityDto)
carts?: AddProductEntityCartItemsEntityDto[]| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityPromotionEntityDto)
promotions?: AddProductEntityPromotionEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntityPromoCodeEntityDto)
promoCodes?: AddProductEntityPromoCodeEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductEntitySavedCollectionItemEntityDto)
savedInCollections?: AddProductEntitySavedCollectionItemEntityDto[]| null;

@IsNumber()
@IsOptional()
brandId?: number | null;

@IsNumber()
@IsOptional()
categoryId?: number | null;

@IsNumber()
@IsOptional()
subCategoryId?: number | null;

@IsNumber()
averageRating: number;

@IsBoolean()
isSaved: boolean;
}
