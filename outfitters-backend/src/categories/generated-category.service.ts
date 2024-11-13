import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import { CreateCategoryEntityDto } from './generated-dtos/create/create-category-entity.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: CreateCategoryEntityDto) {
		return await this.service.create(CategoryEntity, CreateCategoryEntityDto, body);
	}
}
