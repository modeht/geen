import { IsString, IsOptional, IsDate, IsEnum, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { GenderEnum } from '../../entities/shopper-profile.entity'
import { AffiliationLinkEntity } from '../../../affiliation-links/entities/affiliation-link.entity'
import { CartEntity } from '../../../carts/entities/cart.entity'
import { CollaborationEntity } from '../../../collaborations/entities/collaboration.entity'
import { MediaEntity } from '../../../media/entities/media.entity'
import { OrderEntity } from '../../../orders/entities/order.entity'
import { PreferenceEntity } from '../../../preferences/entities/preference.entity'
import { ProductReviewEntity } from '../../../products/entities/product-review.entity'
import { ShippingAddressEntity } from '../../entities/shipping-address.entity'
import { UserEntity } from '../../entities/user.entity'
import { PromoCodeEntity } from '../../../promotions/entities/promo-code.entity'



export class CreateShopperProfileEntityDto {
@IsString()
@IsOptional()
username?: string | null;

@IsString()
@IsOptional()
fullName?: string | null;

@IsDate()
@Type(()=>Date)
dateOfBirth: Date;

@IsString()
bio: string;

@IsNumber()
@IsOptional()
onboardingStep?: number | null;

@IsString()
@IsOptional()
facebookProfileLink?: string | null;

@IsString()
instagramProfileLink: string;

@IsString()
tiktokProfileLink: string;

@IsBoolean()
isOutfitter: boolean;

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

@IsNumber()
brandsCount: number;

@IsNumber()
engagementCount: number;
}
