import { ProductEntity } from 'src/products/entities/product.entity';
import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CategoryEntity } from '../../../categories/entities/category.entity'
import { CollaborationEntity } from '../../../collaborations/entities/collaboration.entity'
import { CollectionEntity } from '../../../collections/entities/collection.entity'
import { CountryEntity } from '../../../countries/entities/countries.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { PreferenceEntity } from '../../../preferences/entities/preference.entity'
import { UserEntity } from '../../entities/user.entity'
import { PromotionEntity } from '../../../promotions/entities/promotion.entity'
import { PromoCodeEntity } from '../../../promotions/entities/promo-code.entity'
import { BrandOrderEntity } from '../../../orders/entities/brand-orders.entity'



export class AddBrandProfileEntityDto {
@IsString()
@IsOptional()
storeName?: string | null;

@IsString()
@IsOptional()
brandName?: string | null;

@IsString()
@IsOptional()
storeBio?: string | null;

@IsString()
@IsOptional()
website?: string | null;

@IsBoolean()
isPublished: boolean;

@IsNumber()
@IsOptional()
shippingCost?: number | null;

@IsString()
@IsOptional()
currency?: string | null;

@IsString()
@IsOptional()
brandManagerFullName?: string | null;

@IsNumber()
@IsOptional()
logoId?: number | null;

@IsBoolean()
isFollowing: boolean;

@IsBoolean()
hasStory: boolean;

@IsNumber()
followersCount: number;

@IsNumber()
followingCount: number;

@IsNumber()
postsCount: number;
}
