import { IsNumber, IsOptional, IsString, IsDate, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { CategoryEntity } from '../../categories/entities/category.entity'
import { PromotionEntity } from '../entities/promotion.entity'
import { PromotionStatusEnum } from '../entities/enums'



export class AddPromotionEntitySeasonalPromotionEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
title?: string| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
start?: Date| null;

@IsDate()
@Type(()=>Date)
@IsOptionalIf((obj,_)=>!!obj.id)
end?: Date| null;
}
