import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { IsBoolean, IsString, IsOptional, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CollectionEntity } from '../../../collections/entities/collection.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { MessageEntity } from '../../../messages/entities/message.entity'
import { OrderItemEntity } from '../../../orders/entities/order-item.entity'
import { PromotionEntity } from '../../../promotions/entities/promotion.entity'
import { ProductOptionEntity } from '../../entities/product-option.entity'
import { ProductReviewEntity } from '../../entities/product-review.entity'
import { ProductVariantEntity } from '../../entities/product-variant.entity'
import { TaggedProductEntity } from '../../entities/tagged-product.entity'
import { SavedCollectionItemEntity } from '../../../saved-collections/entities/saved-collection-item.entity'
import { PromoCodeEntity } from '../../../promotions/entities/promo-code.entity'
import { CartItemsEntity } from '../../../carts/entities/cart-item.entity'



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