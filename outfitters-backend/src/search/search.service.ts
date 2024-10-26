import { Injectable } from '@nestjs/common';
import { DataSource, ILike, IsNull, Not } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { CategoryEntity } from '../categories/entities/category.entity';
import { Paginated } from '../globals/dto/paginated.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/services/users.service';
import { RecentSearchesEntity, searchMode } from './entities/recent-searches.entity';

@Injectable()
export class SearchService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
		private readonly usersService: UsersService,
		private readonly productsService: ProductsService,
	) {}

	async searchProducts(keyword: string, paginated: Paginated) {
		const userId = this.authContext.getUser().sub;

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		try {
			await tr.manager.save(RecentSearchesEntity, {
				userId,
				keyword,
				mode: searchMode.Discover,
			});

			const baseConditions = { isArchived: false, brand: { isPublished: true } };

			const { products, totalCount } = await this.productsService.findAll({
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
				where: [
					{ ...baseConditions, title: ILike(`%${keyword}%`) },
					{ ...baseConditions, description: ILike(`%${keyword}%`) },
					{
						isArchived: false,
						brand: { isPublished: true, brandName: ILike(`%${keyword}%`) },
					},
					{
						isArchived: false,
						brand: { isPublished: true, storeName: ILike(`%${keyword}%`) },
					},
					{
						isArchived: false,
						brand: { isPublished: true },
						category: { name: ILike(`%${keyword}%`) },
					},
					{
						isArchived: false,
						brand: { isPublished: true },
						subCategory: { name: ILike(`%${keyword}%`) },
					},
				],
				relations: {
					media: true,
					category: true,
					subCategory: true,
					brand: { cover: true, logo: true },
					options: { values: true },
					variants: { media: true, optionValues: true },
				},
			});
			await tr.commitTransaction();

			return { products, totalCount };
		} catch (err) {
			await tr.rollbackTransaction();
			throw err;
		} finally {
			await tr.release();
		}
	}

	async searchUsers(keyword: string, paginated: Paginated) {
		const userId = this.authContext.getUser().sub;

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			await tr.manager.save(RecentSearchesEntity, {
				userId,
				keyword,
				mode: searchMode.Message,
			});

			const { users, totalCount } = await this.usersService.findAll({
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
				where: [
					{ shopperProfile: { fullName: ILike(`%${keyword ?? ''}%`) } },
					{ shopperProfile: { username: ILike(`%${keyword ?? ''}%`) } },
					{ brandProfile: { storeName: ILike(`%${keyword ?? ''}%`) } },
					{ brandProfile: { brandName: ILike(`%${keyword ?? ''}%`) } },
				],
			});
			await tr.commitTransaction();
			return { users, totalCount };
		} catch (err) {
			await tr.rollbackTransaction();
			throw err;
		} finally {
			await tr.release();
		}
	}

	async findRecentSearches(mode: searchMode, paginated: Paginated) {
		const userId = this.authContext.getUser().sub;
		const [searches, totalCount] = await this.dataSource.manager.findAndCount(
			RecentSearchesEntity,
			{
				where: { userId, mode },
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
			},
		);
		return { searches, totalCount };
	}

	async deleteRecentSearches(mode: searchMode) {
		const userId = this.authContext.getUser().sub;
		await this.dataSource.manager.delete(RecentSearchesEntity, {
			userId,
			mode,
		});

		return { isDeleted: true };
	}
}
