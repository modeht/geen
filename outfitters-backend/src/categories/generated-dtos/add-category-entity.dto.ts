import { ProductEntity } from 'src/products/entities/product.entity';
import { IsString, IsBoolean, IsOptional, ValidateNested, IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddCategoryEntityMediaEntityDto } from '../../media/generated-dtos/add-category-entity-media-entity.dto';
import { AddCategoryEntityCategoryEntityDto } from '../generated-dtos/add-category-entity-category-entity.dto';
import { AddCategoryEntityProductEntityDto } from '../../products/generated-dtos/add-category-entity-product-entity.dto';
import { AddCategoryEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-category-entity-brand-profile-entity.dto';
import { AddCategoryEntitySeasonalPromotionEntityDto } from '../../promotions/generated-dtos/add-category-entity-seasonal-promotion-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { SeasonalPromotionEntity } from '../../promotions/entities/seasonal-promotion.entity'



export class AddCategoryEntityDto {
@IsString()
name: string;

@IsBoolean()
isArchived: boolean;

@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddCategoryEntityMediaEntityDto)
media?: AddCategoryEntityMediaEntityDto | null;

@IsOptional()
@Relation({entity:'CategoryEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCategoryEntityCategoryEntityDto)
subCategories?: AddCategoryEntityCategoryEntityDto[]| null;

@IsOptional()
@Relation({entity:'CategoryEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCategoryEntityCategoryEntityDto)
superCategory?: AddCategoryEntityCategoryEntityDto| null;

@IsNumber()
@IsOptional()
superCategoryId?: number | null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'hasMany'})
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCategoryEntityProductEntityDto)
products?: AddCategoryEntityProductEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCategoryEntityBrandProfileEntityDto)
categorybrandProfiles?: AddCategoryEntityBrandProfileEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCategoryEntityBrandProfileEntityDto)
subCategoriesBrandProfiles?: AddCategoryEntityBrandProfileEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@IsArray()
@Type(() => AddCategoryEntitySeasonalPromotionEntityDto)
seasonalPromotions?: AddCategoryEntitySeasonalPromotionEntityDto[]| null;
}
