import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOneOptions } from 'typeorm';
import { Utils } from '../../lib/utils';
import { AuthContext } from '../auth/auth.context';
import { PrimitiveFields } from '../globals/lib/type-helpers';
import { MediaEntity } from '../media/entities/media.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionEntity } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
	private noneNullableFields: Record<keyof PrimitiveFields<CollectionEntity>, boolean> = {
		id: true,
		name: true,
		isFeatured: true,
		isPublic: true,
		brandId: true,
	};

	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
	) {}

	async create(createCollectionDto: CreateCollectionDto) {
		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		const brandId = this.authContext.getUser()!.sub;

		try {
			const newCollection = new CollectionEntity();

			newCollection.name = createCollectionDto.name;
			newCollection.isPublic = createCollectionDto.isPublic;
			newCollection.cover = {
				id: createCollectionDto.coverId,
			} as MediaEntity;
			newCollection.brandId = brandId;

			const created = await this.datasource.manager.save(CollectionEntity, newCollection);

			await tr.commitTransaction();
			return created;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async findAll(opts: FindManyOptions<CollectionEntity>) {
		const [collections, totalCount] = await this.datasource.manager.findAndCount(
			CollectionEntity,
			opts,
		);
		return { collections, totalCount };
	}

	async findOne(opts: FindOneOptions<CollectionEntity>, throwIfNotFound = true) {
		const row = await this.datasource.manager.findOne(CollectionEntity, opts);

		if (throwIfNotFound) {
			if (!row) {
				throw new NotFoundException('Record was not found');
			}
		}
		return row;
	}

	async update(id: number, payload: UpdateCollectionDto) {
		const brandId = this.authContext.getUser()!.sub;
		Utils.validateNullProperties(
			payload,
			Object.keys(this.noneNullableFields)
				.filter((key) => this.noneNullableFields[key] === true)
				.map((k) => k),
		);

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			const rowExists = await this.findOne({
				where: {
					id,
					brandId,
				},
				relations: {
					brand: true,
					cover: true,
				},
			});

			rowExists.cover = {
				id: Utils.updatePrimitiveField(rowExists.cover?.id, payload.coverId),
			} as MediaEntity;
			rowExists.name = Utils.updatePrimitiveField(rowExists.name, payload.name);
			rowExists.isPublic = Utils.updatePrimitiveField(
				rowExists.isPublic,
				payload.isPublic,
			);
			rowExists.products = Utils.updateMtMField(rowExists.products, payload.products);

			await tr.manager.save(CollectionEntity, rowExists);

			const updated = await tr.manager.findOne(CollectionEntity, {
				where: { id: id },
				relations: { cover: true, brand: true },
			});
			await tr.commitTransaction();
			return updated;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async remove(id: number) {
		const brandId = this.authContext.getUser()!.sub;
		const collection = await this.findOne({
			where: {
				id,
				brandId,
			},
		});

		await this.datasource.manager.remove(CollectionEntity, collection);

		return collection;
	}

	async setFeatured(id: number, isFeatured: boolean) {
		const collection = await this.findOne({ where: { id } });
		collection.isFeatured = isFeatured;
		await this.datasource.manager.save(CollectionEntity, collection);
		return collection;
	}
}
