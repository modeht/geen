import { ProductEntity } from 'src/products/entities/product.entity';
import { IsString, IsOptional, IsBoolean, IsNumber, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddBrandProfileEntityUserEntityDto } from '../../generated-dtos/create/create-brand-profile-entity-user-entity.dto';
import { AddBrandProfileEntityMediaEntityDto } from '../../../media/generated-dtos/create/create-brand-profile-entity-media-entity.dto';
import { AddBrandProfileEntityCollectionEntityDto } from '../../../collections/generated-dtos/create/create-brand-profile-entity-collection-entity.dto';
import { AddBrandProfileEntityProductEntityDto } from '../../../products/generated-dtos/create/create-brand-profile-entity-product-entity.dto';
import { AddBrandProfileEntityPromotionEntityDto } from '../../../promotions/generated-dtos/create/create-brand-profile-entity-promotion-entity.dto';
import { AddBrandProfileEntityPromoCodeEntityDto } from '../../../promotions/generated-dtos/create/create-brand-profile-entity-promo-code-entity.dto';
import { AddBrandProfileEntityBrandOrderEntityDto } from '../../../orders/generated-dtos/create/create-brand-profile-entity-brand-order-entity.dto';
import { AddBrandProfileEntityPreferenceEntityDto } from '../../../preferences/generated-dtos/create/create-brand-profile-entity-preference-entity.dto';
import { AddBrandProfileEntityCollaborationEntityDto } from '../../../collaborations/generated-dtos/create/create-brand-profile-entity-collaboration-entity.dto';
import { AddBrandProfileEntityCategoryEntityDto } from '../../../categories/generated-dtos/create/create-brand-profile-entity-category-entity.dto';
import { AddBrandProfileEntityCountryEntityDto } from '../../../countries/generated-dtos/create/create-brand-profile-entity-country-entity.dto';
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

@IsOptional()
@Relation({entity:'UserEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddBrandProfileEntityUserEntityDto)
user?: AddBrandProfileEntityUserEntityDto| null;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddBrandProfileEntityMediaEntityDto)
logo?: AddBrandProfileEntityMediaEntityDto | null;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddBrandProfileEntityMediaEntityDto)
cover?: AddBrandProfileEntityMediaEntityDto | null;

@IsOptional()
@Relation({entity:'CollectionEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityCollectionEntityDto)
collections?: AddBrandProfileEntityCollectionEntityDto[] | null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityProductEntityDto)
products?: AddBrandProfileEntityProductEntityDto[] | null;

@IsOptional()
@Relation({entity:'PromotionEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityPromotionEntityDto)
promotions?: AddBrandProfileEntityPromotionEntityDto[] | null;

@IsOptional()
@Relation({entity:'PromoCodeEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityPromoCodeEntityDto)
promoCodes?: AddBrandProfileEntityPromoCodeEntityDto[] | null;

@IsOptional()
@Relation({entity:'BrandOrderEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityBrandOrderEntityDto)
brandOrders?: AddBrandProfileEntityBrandOrderEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityPreferenceEntityDto)
preferences?: AddBrandProfileEntityPreferenceEntityDto[] | null;

@IsOptional()
@Relation({entity:'CollaborationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityCollaborationEntityDto)
collaborations?: AddBrandProfileEntityCollaborationEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityCategoryEntityDto)
categories?: AddBrandProfileEntityCategoryEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityCategoryEntityDto)
subCategories?: AddBrandProfileEntityCategoryEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddBrandProfileEntityCountryEntityDto)
countries?: AddBrandProfileEntityCountryEntityDto[] | null;

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
