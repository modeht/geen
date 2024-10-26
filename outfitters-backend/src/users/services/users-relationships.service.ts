import {
	ConflictException,
	Injectable,
	MethodNotAllowedException,
	NotFoundException,
} from '@nestjs/common';
import { Brackets, DataSource, In } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { Paginated } from '../../globals/dto/paginated.dto';
import { addIsFollowingToQuery } from '../common-queries';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UsersRelationshipsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
		private readonly usersService: UsersService,
	) {}

	_buildQuery(paginated: Paginated, keyword?: string) {
		const userId = this.authContext.getUser().sub;
		const queryBuilder = this.dataSource.manager
			.createQueryBuilder(UserEntity, 'user')
			.leftJoinAndSelect('user.shopperProfile', 'shopper_profile')
			.leftJoinAndSelect('shopper_profile.profilePicture', 'profile_picture')
			.leftJoinAndSelect('user.brandProfile', 'brand_profile')
			.leftJoinAndSelect('brand_profile.logo', 'logo')
			.orderBy('"user_isFollowing"', 'DESC')
			.limit(paginated.limit)
			.offset(paginated.limit * paginated.page);

		addIsFollowingToQuery(userId, 'user', queryBuilder);

		if (keyword) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.where('shopper_profile.username ILIKE :keyword', {
						keyword: `%${keyword}%`,
					})
						.orWhere('shopper_profile.fullName ILIKE :keyword', {
							keyword: `%${keyword}%`,
						})
						.orWhere('brand_profile.storeName ILIKE :keyword', {
							keyword: `%${keyword}%`,
						})
						.orWhere('brand_profile.brandName ILIKE :keyword', {
							keyword: `%${keyword}%`,
						});
				}),
			);
		}

		return queryBuilder;
	}

	async getRelationship(id: number) {
		const userId = this.authContext.getUser().sub;
		const [result] = await this.dataSource.manager.query(
			`SELECT 
				EXISTS(SELECT 1 FROM user_follows WHERE "followerId" = $1 AND "followingId" = $2) AS follows,
				EXISTS(SELECT 1 FROM user_follows WHERE "followerId" = $2 AND "followingId" = $1) AS followedBy,
				EXISTS(SELECT 1 FROM user_blocks WHERE "blockerId" = $1 AND "blockedId" = $2) AS blocked`,
			[userId, id],
		);
		return result;
	}

	async getFollowers(id: number, paginated: Paginated, keyword?: string) {
		const queryBuilder = this._buildQuery(paginated, keyword);
		const [followers, totalCount] = await queryBuilder
			.innerJoinAndSelect(
				(qb) => qb.from('user_follows', 'uf').where('uf."followingId" = :id', { id }),
				'user_follows',
				'user_follows."followerId" = user.id',
			)
			.getManyAndCount();
		return { followers, totalCount };
	}

	async getFollowing(id: number, paginated: Paginated, keyword?: string) {
		const queryBuilder = this._buildQuery(paginated, keyword);
		const [following, totalCount] = await queryBuilder
			.innerJoinAndSelect(
				(qb) => qb.from('user_follows', 'uf').where('uf."followerId" = :id', { id }),
				'user_follows',
				'user_follows."followingId" = user.id',
			)
			.getManyAndCount();
		return { following, totalCount };
	}

	async getBrands(id: number, paginated: Paginated, keyword?: string) {
		const queryBuilder = this._buildQuery(paginated, keyword);
		const [brands, totalCount] = await queryBuilder
			.innerJoin(
				CollaborationEntity,
				'collaboration',
				'collaboration.brandId = user.id AND collaboration.shopperId = :id',
				{ id },
			)
			.getManyAndCount();
		return { brands, totalCount };
	}

	async getBlocked(id: number, paginated: Paginated, keyword?: string) {
		const queryBuilder = this._buildQuery(paginated, keyword);
		const [blocked, totalCount] = await queryBuilder
			.innerJoinAndSelect(
				(qb) => qb.from('user_blocks', 'ub').where('ub."blockerId" = :id', { id }),
				'user_blocks',
				'user_blocks."blockedId" = user.id',
			)
			.getManyAndCount();
		return { blocked, totalCount };
	}

	async followMany(ids: number[]) {
		const userId = this.authContext.getUser().sub;
		if (ids.includes(userId)) throw new MethodNotAllowedException('Cannot follow self');
		const count = await this.usersService.count({ id: In(ids) });
		if (count !== ids.length) throw new NotFoundException('User not found');
		await this._isBlockedCheck(userId, ids);
		try {
			await this.dataSource.manager.insert(
				'user_follows',
				ids.map((id) => ({ followerId: userId, followingId: id })),
			);
		} catch (e) {
			throw new ConflictException('one or all the users are already followed');
		}
		return ids.map((id) => ({ id, isFollowing: true }));
	}

	async follow(id: number) {
		const userId = this.authContext.getUser().sub;
		if (userId === id) throw new MethodNotAllowedException('Cannot follow self');
		const exists = await this.usersService.exists({ id });
		if (!exists) throw new NotFoundException('User not found');
		await this._isBlockedCheck(userId, [id]);
		try {
			await this.dataSource.manager.insert('user_follows', {
				followerId: userId,
				followingId: id,
			});
		} catch (e) {
			throw new ConflictException('User already followed');
		}
		return { isFollowing: true };
	}

	async unfollow(id: number) {
		const userId = this.authContext.getUser().sub;
		await this.dataSource.manager.delete('user_follows', {
			followerId: userId,
			followingId: id,
		});
		return { isFollowing: false };
	}

	async block(id: number) {
		const userId = this.authContext.getUser().sub;
		if (userId === id) throw new MethodNotAllowedException('Cannot block self');
		const exists = await this.usersService.exists({ id });
		if (!exists) throw new NotFoundException('User not found');

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			await tr.manager.delete('user_follows', [
				{ followerId: userId, followingId: id },
				{ followerId: id, followingId: userId },
			]);

			await tr.manager.insert('user_blocks', {
				blockerId: userId,
				blockedId: id,
			});
			await tr.commitTransaction();
			return { isBlocked: true };
		} catch (e) {
			await tr.rollbackTransaction();
			throw new ConflictException('User is already blocked');
		} finally {
			await tr.release();
		}
	}

	async unblock(id: number) {
		const userId = this.authContext.getUser().sub;
		await this.dataSource.manager.delete('user_blocks', {
			blockerId: userId,
			blockedId: id,
		});
		return { isBlocked: false };
	}

	async _isBlockedCheck(userId: number, ids: number[]) {
		const isBlocked = await this.dataSource.manager.exists('user_blocks', {
			where: [
				{ blockerId: userId, blockedId: In(ids) },
				{ blockerId: In(ids), blockedId: userId },
			],
		});
		if (isBlocked) throw new MethodNotAllowedException('One or more users are blocked');
	}
}
