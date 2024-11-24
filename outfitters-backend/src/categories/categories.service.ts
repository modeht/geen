import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOneOptions } from 'typeorm';
import { MediaEntity } from '../media/entities/media.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
// import { AddCategoryEntityDto } from './generated-dtos/add-category-entity.dto';
import { AbstractService } from '../globals/services/abstract-service';
import { TCreateCategorySchemaInput } from './generated-schemas/create-category.schema';

@Injectable()
export class CategoriesService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async testCreate(body: TCreateCategorySchemaInput) {
		const d = await this.service.create(body);
		return d;
	}

	async create(createCategoryDto: CreateCategoryDto) {
		const category = new CategoryEntity();
		category.name = createCategoryDto.name;

		if (createCategoryDto.mediaId) {
			category.media = { id: createCategoryDto.mediaId } as MediaEntity;
		}

		if (createCategoryDto.superCategoryId) {
			// category.superCategoryId = createCategoryDto.superCategoryId;
		} else if (createCategoryDto.subCategories) {
			category.subCategories = createCategoryDto.subCategories.map(
				(name) =>
					({
						name,
					}) as CategoryEntity,
			);
		}

		await this.datasource.manager.save(category);
		return this.findOne({
			where: { id: category.id },
			relations: { subCategories: true },
		});
	}

	async findAll(opts: FindManyOptions<CategoryEntity>) {
		const [categories, totalCount] = await this.datasource.manager.findAndCount(
			CategoryEntity,
			opts,
		);
		return { categories, totalCount };
	}

	async findOne(opts: FindOneOptions<CategoryEntity>, throwIfNotFound = true) {
		const row = await this.datasource.manager.findOne(CategoryEntity, opts);
		if (throwIfNotFound) {
			if (!row) {
				throw new NotFoundException('Record was not found');
			}
		}
		return row;
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.findOne({ where: { id } });
		category.name = updateCategoryDto.name;
		// category.superCategoryId = updateCategoryDto.superCategoryId;
		if (updateCategoryDto.mediaId) {
			category.media = { id: updateCategoryDto.mediaId } as MediaEntity;
		}

		await this.datasource.manager.save(category);
		return this.findOne({ where: { id } });
	}

	async remove(id: number) {
		const category = await this.findOne({ where: { id } });
		try {
			await this.datasource.manager.remove(category);
		} catch (e) {
			category.isArchived = true;
			await this.datasource.manager.save(category);
		}
		return category;
	}
}
