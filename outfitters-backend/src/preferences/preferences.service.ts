import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paginated } from '../globals/dto/paginated.dto';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PreferenceEntity } from './entities/preference.entity';

@Injectable()
export class PreferencesService {
	constructor(private datasource: DataSource) {}
	async create(createPreferenceDto: CreatePreferenceDto) {
		const preference = new PreferenceEntity();
		preference.name = createPreferenceDto.name;
		preference.mediaId = createPreferenceDto.mediaId;
		await this.datasource.manager.save(preference);
		return this.findOne(preference.id);
	}

	async findAll(paginated: Paginated) {
		const [preferences, totalCount] = await this.datasource.manager.findAndCount(
			PreferenceEntity,
			{
				relations: {
					media: true,
				},
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
			},
		);
		return { preferences, totalCount };
	}

	async findOne(id: number) {
		const row = await this.datasource.manager.findOne(PreferenceEntity, {
			where: { id },
			relations: {
				media: true,
			},
		});

		if (!row) {
			throw new NotFoundException('Preference not found');
		}
		return row;
	}

	async update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
		const preference = await this.findOne(id);
		preference.name = updatePreferenceDto.name ?? preference.name;
		preference.mediaId = updatePreferenceDto.mediaId ?? preference.mediaId;
		await this.datasource.manager.save(preference);
		return this.findOne(id);
	}

	async remove(id: number) {
		const preference = await this.findOne(id);
		await this.datasource.manager.remove(preference);
		return preference;
	}
}
