import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateBannerSchema, {
	TCreateBannerSchemaInput,
	TCreateBannerSchemaOutput,
} from './generated-schemas//create-banner.schema';
import UpdateBannerSchema, {
	TUpdateBannerSchemaInput,
	TUpdateBannerSchemaOutput,
} from './generated-schemas//update-banner.schema';
import ReadBannerSchema, {
	TReadBannerSchemaInput,
	TReadBannerSchemaOutput,
} from './generated-schemas//read-banner-query.schema';
import { BannerEntity } from './entities/banner.entity';

@Injectable()
export class BannerService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateBannerSchemaOutput) {
		return await this.service.create(BannerEntity, body);
	}

	async updateRow(id: number, body: TUpdateBannerSchemaOutput) {
		return await this.service.update(BannerEntity, id, body);
	}

	async readRows(query: TReadBannerSchemaOutput) {
		return await this.service.read(BannerEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(BannerEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(BannerEntity, id, { soft: true });
	}
}
