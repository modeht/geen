import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { UploadedFile } from '..';
import { MediaEntity } from './entities/media.entity';
import { AddMediaEntityDto } from './generated-dtos/add-media-entity.dto';
import { AbstractService } from '../globals/services/abstract-service';

@Injectable()
export class MediaService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async testCreate(body: AddMediaEntityDto) {
		const d = await this.service.create(MediaEntity, AddMediaEntityDto, body);
		return d;
	}

	async create(media: UploadedFile[]): Promise<{ id: number; url: string }[]> {
		const promises = [];
		media.forEach((file) => {
			const p = this.datasource.manager
				.insert(MediaEntity, {
					mimetype: file.original.mimetype,
					url: file.url,
				})
				.then((res) => {
					return { id: res.identifiers[0].id as number, url: file.url };
				});

			promises.push(p);
		});

		return Promise.all(promises);
	}

	async findAll(opts: { ids: number[] }) {
		return this.datasource.manager.find(MediaEntity, {
			where: {
				id: In(opts.ids),
			},
		});
	}
}
