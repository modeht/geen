import { IsOptional, ValidateNested, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddProductReviewEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-product-review-entity-shopper-profile-entity.dto';
import { AddProductReviewEntityMediaEntityDto } from '../../media/generated-dtos/add-product-review-entity-media-entity.dto';
import { AddProductReviewEntityProductEntityDto } from '../generated-dtos/add-product-review-entity-product-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { ProductEntity } from '../entities/product.entity'



export class AddProductReviewEntityDto {
@IsOptional()
@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductReviewEntityShopperProfileEntityDto)
shopperProfile?: AddProductReviewEntityShopperProfileEntityDto | null;

@IsNumber()
@IsOptional()
stars?: number | null;

@IsString()
@IsOptional()
comment?: string | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MediaEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddProductReviewEntityMediaEntityDto)
media?: AddProductReviewEntityMediaEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddProductReviewEntityProductEntityDto)
product?: AddProductReviewEntityProductEntityDto | null;

@IsNumber()
productId: number;

@IsNumber()
shopperId: number;
}
