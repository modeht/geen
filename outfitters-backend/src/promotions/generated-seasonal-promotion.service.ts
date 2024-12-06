import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateSeasonalPromotionSchema, {
	TCreateSeasonalPromotionSchemaInput,
	TCreateSeasonalPromotionSchemaOutput,
} from './generated-schemas//create-seasonal-promotion.schema';
import UpdateSeasonalPromotionSchema, {
	TUpdateSeasonalPromotionSchemaInput,
	TUpdateSeasonalPromotionSchemaOutput,
} from './generated-schemas//update-seasonal-promotion.schema';
import ReadSeasonalPromotionSchema, {
	TReadSeasonalPromotionSchemaInput,
	TReadSeasonalPromotionSchemaOutput,
} from './generated-schemas//read-seasonal-promotion-query.schema';
import { SeasonalPromotionEntity } from './entities/seasonal-promotion.entity';

@Injectable()
export class SeasonalPromotionService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateSeasonalPromotionSchemaOutput) {
		return await this.service.create(SeasonalPromotionEntity, body);
	}

	async updateRow(id: number, body: TUpdateSeasonalPromotionSchemaOutput) {
		return await this.service.update(SeasonalPromotionEntity, id, body);
	}

	async readRows(query: TReadSeasonalPromotionSchemaOutput) {
		return await this.service.read(SeasonalPromotionEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(SeasonalPromotionEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(SeasonalPromotionEntity, id, { soft: true });
	}
}
