//@ts-nocheck
import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { AdEntity } from '../../ads/entities/ad.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserInterestEntity } from '../../users/entities/user-interests.entity';
import { BannerEntity } from '../../banners/entities/banner.entity';
import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { testenum } from '../entities/category.entity.ts'
import { AddMediaEntityDto } from './add-category-entity-media-entity.dto.ts';



export class AddCategoryEntityDto {
@IsString()
@IsOptional()
name?: string | null;

@IsEnum(testenum)
testenum: testenum;

@IsOptional()
interestedIn?: UserInterestEntity[] | null;

@IsOptional()
banners?: BannerEntity | null;

@IsOptional()
icon?: MediaEntity | null;

@IsBoolean()
visible: boolean;

@IsBoolean()
isArchived: boolean;

@IsNumber()
@IsOptional()
index?: number | null;

@IsDate()
@Type(()=>Date)
createdAt: Date;

@IsDate()
@Type(()=>Date)
updatedAt: Date;
}
