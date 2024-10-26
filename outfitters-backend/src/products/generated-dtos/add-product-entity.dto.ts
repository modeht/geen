import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsBoolean, IsString, IsOptional, IsNumber, IsDate, IsArray, ValidateNested } from "class-validator";
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
@Relation({entity:'MediaEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityMediaEntityDto)
media?: AddProductEntityMediaEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'ProductVariantEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityProductVariantEntityDto)
variants?: AddProductEntityProductVariantEntityDto[] | null;

@IsOptional()
@Relation({entity:'ProductOptionEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityProductOptionEntityDto)
options?: AddProductEntityProductOptionEntityDto[]| null;

@IsOptional()
@IsOptional()
@Relation({entity:'ProductReviewEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityProductReviewEntityDto)
ratings?: AddProductEntityProductReviewEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'TaggedProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityTaggedProductEntityDto)
taggedIn?: AddProductEntityTaggedProductEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'AffiliationLinkEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityAffiliationLinkEntityDto)
affiliationLinks?: AddProductEntityAffiliationLinkEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'NotificationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityNotificationEntityDto)
notifications?: AddProductEntityNotificationEntityDto[] | null;

@IsOptional()
@Relation({entity:'OrderItemEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityOrderItemEntityDto)
orderItems?: AddProductEntityOrderItemEntityDto[]| null;

@IsOptional()
@Relation({entity:'MessageEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityMessageEntityDto)
messages?: AddProductEntityMessageEntityDto[]| null;

@IsOptional()
@IsOptional()
@Relation({entity:'BrandProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductEntityBrandProfileEntityDto)
brand?: AddProductEntityBrandProfileEntityDto | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CategoryEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductEntityCategoryEntityDto)
category?: AddProductEntityCategoryEntityDto | null;

@IsOptional()
@IsOptional()
@Relation({entity:'CategoryEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductEntityCategoryEntityDto)
subCategory?: AddProductEntityCategoryEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityCollectionEntityDto)
collections?: AddProductEntityCollectionEntityDto[] | null;

@IsOptional()
@Relation({entity:'CartItemsEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityCartItemsEntityDto)
carts?: AddProductEntityCartItemsEntityDto[]| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityPromotionEntityDto)
promotions?: AddProductEntityPromotionEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddProductEntityPromoCodeEntityDto)
promoCodes?: AddProductEntityPromoCodeEntityDto[] | null;

@IsOptional()
@Relation({entity:'SavedCollectionItemEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
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
