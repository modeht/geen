import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreatePostLikesSchema, {
	TCreatePostLikesSchemaInput,
	TCreatePostLikesSchemaOutput,
} from './generated-schemas//create-post-likes.schema';
import UpdatePostLikesSchema, {
	TUpdatePostLikesSchemaInput,
	TUpdatePostLikesSchemaOutput,
} from './generated-schemas//update-post-likes.schema';
import ReadPostLikesSchema, {
	TReadPostLikesSchemaInput,
	TReadPostLikesSchemaOutput,
} from './generated-schemas//read-post-likes-query.schema';
import { PostLikesEntity } from './entities/posts-likes.entity';

@Injectable()
export class PostLikesService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreatePostLikesSchemaOutput) {
		return await this.service.create(PostLikesEntity, body);
	}

	async updateRow(id: number, body: TUpdatePostLikesSchemaOutput) {
		return await this.service.update(PostLikesEntity, id, body);
	}

	async readRows(query: TReadPostLikesSchemaOutput) {
		return await this.service.read(PostLikesEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(PostLikesEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(PostLikesEntity, id, { soft: true });
	}
}
