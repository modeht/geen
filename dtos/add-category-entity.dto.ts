//@ts-nocheck
import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { AdEntity } from '../../ads/entities/ad.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserInterestEntity } from '../../users/entities/user-interests.entity';
import { BannerEntity } from '../../banners/entities/banner.entity';
import * as v from "class-validator";
import * as t from "class-transformer";
import { testenum } from '../entities/category.entity.ts'
import { AddMediaEntityDto } from './add-category-entity-media-entity.dto.ts';



export class AddCategoryEntityDto {
@v.IsString()
@v.IsOptional()
name?: string | null;

@IsEnum(testenum)
testenum: testenum;

@v.IsOptional()
interestedIn?: UserInterestEntity[] | null;

@v.IsOptional()
banners?: BannerEntity | null;

@v.IsOptional()
icon?: MediaEntity | null;

@v.IsOptional()
translations?: TranslationEntity[] | null;

@v.IsOptional()
filters?: CategoryFilterEntity[] | null;


ads: AdEntity[];

@v.IsOptional()
filter?: CategoryFilterEntity | null;

@v.IsBoolean()
visible: boolean;

@v.IsBoolean()
isArchived: boolean;

@v.IsNumber()
@v.IsOptional()
index?: number | null;

@v.IsDate()
@t.Type(()=>Date)
createdAt: Date;

@v.IsDate()
@t.Type(()=>Date)
updatedAt: Date;
}
