import { IsString, IsDate, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { CategoryEntity } from '../../../categories/entities/category.entity'
import { PromotionEntity } from '../../entities/promotion.entity'
import { PromotionStatusEnum } from '../../entities/enums'



export class CreateSeasonalPromotionEntityDto {
@IsString()
title: string;

@IsDate()
@Type(()=>Date)
start: Date;

@IsDate()
@Type(()=>Date)
end: Date;
}
