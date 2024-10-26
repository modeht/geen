import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { Paginated } from '../globals/dto/paginated.dto';
import { CreateSavedCollectionDto } from './dto/create-saved-collection.dto';
import { UpdateSavedCollectionDto } from './dto/update-saved-collection.dto';
import {
	DEFAULT_COLLECTION_NAME,
	SavedCollectionEntity,
} from './entities/saved-collection.entity';
import { SavedCollectionItemEntity } from './entities/saved-collection-item.entity';

@Injectable()
export class SavedCollectionsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	create(createSavedCollectionDto: CreateSavedCollectionDto) {
		const userId = this.authContext.getUser().sub;
		const savedCollection = new SavedCollectionEntity();
		savedCollection.userId = userId;
		savedCollection.name = createSavedCollectionDto.name;
		savedCollection.items = [];

		createSavedCollectionDto.postIds?.forEach((postId) => {
			savedCollection.items.push({
				userId,
				postId,
			} as SavedCollectionItemEntity);
		});
		createSavedCollectionDto.productIds?.forEach((productId) => {
			savedCollection.items.push({
				userId,
				productId,
			} as SavedCollectionItemEntity);
		});

		return this.dataSource.manager.save(SavedCollectionEntity, savedCollection);
	}

	async update(id: number, updateSavedCollectionDto: UpdateSavedCollectionDto) {
		const userId = this.authContext.getUser().sub;
		const savedCollection = await this.findOne(id);
		savedCollection.name = updateSavedCollectionDto?.name;

		if (updateSavedCollectionDto.postIds || updateSavedCollectionDto.productIds) {
			savedCollection.items = [];
			updateSavedCollectionDto.postIds?.forEach((postId) => {
				savedCollection.items.push({
					userId,
					postId,
				} as SavedCollectionItemEntity);
			});
			updateSavedCollectionDto.productIds?.forEach((productId) => {
				savedCollection.items.push({
					userId,
					productId,
				} as SavedCollectionItemEntity);
			});
		}

		await this.dataSource.manager.save(SavedCollectionEntity, savedCollection);
		return savedCollection;
	}

	async remove(id: number) {
		const savedCollection = await this.findOne(id);
		await this.dataSource.manager.remove(savedCollection);
		return savedCollection;
	}
	private async _addItemToCollection(
		itemId: number,
		itemType: 'post' | 'product',
		id: string | undefined,
	) {
		const userId = this.authContext.getUser().sub;
		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		let savedCollectionId: number;
		try {
			if (!id) {
				const collection = await this._getDefaultCollection(userId, tr);
				savedCollectionId = collection.id;
			} else if (!+id) {
				throw new UnprocessableEntityException('Invalid collection id');
			} else {
				const exists = await tr.manager.exists(SavedCollectionEntity, {
					where: { id: +id, userId },
				});
				if (!exists) throw new NotFoundException('Saved collection not found');
				savedCollectionId = +id;
			}

			const column = itemType === 'post' ? 'postId' : 'productId';
			await tr.manager.insert('saved_collection_items', {
				savedCollectionId,
				userId,
				[column]: itemId,
			});
			await tr.commitTransaction();
			return {
				savedCollectionId,
				[column]: itemId,
				isSaved: true,
			};
		} catch (e) {
			await tr.rollbackTransaction();
			throw new BadRequestException(
				'Failed to add item to collection, make sure item exists, not already saved and collection exists',
			);
		} finally {
			await tr.release();
		}
	}

	private async _getDefaultCollection(userId: number, tr: QueryRunner) {
		const collection = await tr.manager.findOne(SavedCollectionEntity, {
			where: { userId },
			order: { id: 'ASC' },
		});
		if (!collection) {
			const savedCollection = new SavedCollectionEntity();
			savedCollection.userId = userId;
			savedCollection.name = DEFAULT_COLLECTION_NAME;
			savedCollection;
			return tr.manager.save(SavedCollectionEntity, savedCollection);
		}
		return collection;
	}

	async addPost(postId: number, id?: string) {
		return this._addItemToCollection(postId, 'post', id);
	}

	async addProduct(productId: number, id?: string) {
		return this._addItemToCollection(productId, 'product', id);
	}

	async removePost(id: number, postId: number) {
		const userId = this.authContext.getUser().sub;
		await this.dataSource.manager.delete('saved_collection_items', {
			savedCollectionId: id,
			postId,
			userId,
		});
		return { savedCollectionId: id, postId, isSaved: false };
	}

	async removeProduct(id: number, productId: number) {
		const userId = this.authContext.getUser().sub;
		await this.dataSource.manager.delete('saved_collection_items', {
			savedCollectionId: id,
			productId,
			userId,
		});
		return { savedCollectionId: id, productId, isSaved: false };
	}

	async findAll(paginated: Paginated) {
		const userId = this.authContext.getUser().sub;
		const [collections, totalCount] = await this.dataSource.manager.findAndCount(
			SavedCollectionEntity,
			{
				where: { userId },
				relations: { items: { post: { media: true }, product: { media: true } } },
				order: { createdAt: 'DESC' },
				skip: paginated.limit * paginated.page,
				take: paginated.limit,
			},
		);
		return { collections, totalCount };
	}

	async findOne(id: number) {
		const userId = this.authContext.getUser().sub;
		const collection = await this.dataSource.manager.findOne(SavedCollectionEntity, {
			where: { id, userId },
			relations: { items: { post: { media: true }, product: { media: true } } },
		});
		if (!collection) throw new NotFoundException('Saved collection not found');
		return collection;
	}
}
