import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateSeasonalPromotionDto } from '../dto/create-seasonal-promotion.dto';
import { SeasonalPromotionEntity } from '../entities/seasonal-promotion.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Injectable()
export class SeasonalPromotionsService {
	constructor(private readonly dataSource: DataSource) {}

	async create(createSeasonalPromotionDto: CreateSeasonalPromotionDto) {
		const seasonalPromotion = new SeasonalPromotionEntity();
		seasonalPromotion.title = createSeasonalPromotionDto.title;
		seasonalPromotion.start = createSeasonalPromotionDto.start;
		seasonalPromotion.end = createSeasonalPromotionDto.end;
		seasonalPromotion.status = createSeasonalPromotionDto.status;
		seasonalPromotion.subCategories = createSeasonalPromotionDto.subCategoryIds.map(
			(id) => ({ id }) as CategoryEntity,
		);

		return this.dataSource.manager.save(SeasonalPromotionEntity, seasonalPromotion);
	}
}
