import { IsString, IsDate, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddSeasonalPromotionEntityPromotionEntityDto } from '../generated-dtos/add-seasonal-promotion-entity-promotion-entity.dto';
import { AddSeasonalPromotionEntityCategoryEntityDto } from '../../categories/generated-dtos/add-seasonal-promotion-entity-category-entity.dto';
import { CategoryEntity } from '../../categories/entities/category.entity'
import { PromotionEntity } from '../entities/promotion.entity'
import { PromotionStatusEnum } from '../entities/enums'



export class AddSeasonalPromotionEntityDto {
@IsString()
title: string;

@IsDate()
@Type(()=>Date)
start: Date;

@IsDate()
@Type(()=>Date)
end: Date;

@IsEnum(PromotionStatusEnum)
status: PromotionStatusEnum;

@IsOptional()
@Relation({entity:'PromotionEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddSeasonalPromotionEntityPromotionEntityDto)
promotions?: AddSeasonalPromotionEntityPromotionEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddSeasonalPromotionEntityCategoryEntityDto)
subCategories?: AddSeasonalPromotionEntityCategoryEntityDto[]| null;
}
