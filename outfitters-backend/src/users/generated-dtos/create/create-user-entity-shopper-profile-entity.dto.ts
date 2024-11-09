import { IsNumber, IsOptional, IsString, IsDate, IsEnum, IsBoolean } from "class-validator";
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



export class AddUserEntityShopperProfileEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
username?: string | null;

@IsString()
@IsOptional()
fullName?: string | null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
dateOfBirth?: Date| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
bio?: string| null;

@IsNumber()
@IsOptional()
onboardingStep?: number | null;

@IsString()
@IsOptional()
facebookProfileLink?: string | null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
instagramProfileLink?: string| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
tiktokProfileLink?: string| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isOutfitter?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isFollowing?: boolean| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
hasStory?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
followersCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
followingCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postsCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
brandsCount?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
engagementCount?: number| null;
}
