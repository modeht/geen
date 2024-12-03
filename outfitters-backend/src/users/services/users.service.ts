import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { AuthService } from '../../auth/auth.service';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { CountryEntity } from '../../countries/entities/countries.entity';
import {
	addHasStoryToQuery,
	addIsFollowingToQuery,
	addUserEngagementToQuery,
} from '../common-queries';
import { AdminUpdateUserDto } from '../dto/admin-update-user.dto';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BrandProfileEntity } from '../entities/brand-profile.entity';
import { ShopperProfileEntity } from '../entities/shopper-profile.entity';
import { UserEntity } from '../entities/user.entity';
import { AbstractService } from '../../globals/services/abstract-service';

@Injectable()
export class UsersService {
	constructor(
		private readonly dataSource: DataSource,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly authContext: AuthContext,
		private service: AbstractService,
	) {}

	async exists(
		where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
	): Promise<boolean> {
		return this.dataSource.manager.exists(UserEntity, { where });
	}

	async count(where: FindOptionsWhere<UserEntity>) {
		return this.dataSource.manager.count(UserEntity, { where });
	}

	async findOneDetailed(where: FindOptionsWhere<UserEntity>, throwIfNotFound = true) {
		const qb = this.dataSource.manager
			.createQueryBuilder(UserEntity, 'user')
			.setFindOptions({
				loadEagerRelations: true,
				select: [
					'id',
					'email',
					'phone',
					'emailVerified',
					'isGoogleSignin',
					'isAppleSignin',
					'password',
					'firebaseId',
					'updatedAt',
					'createdAt',
					'status',
				],
				where,
			})
			.leftJoinAndSelect('user__shopperProfile.addresses', 'addresses')
			.leftJoinAndSelect('user__shopperProfile.preferences', 'preferences')
			.leftJoinAndSelect('user__brandProfile.preferences', 'preferences__brandProfile')
			.leftJoinAndMapOne(
				'user__shopperProfile.collaborations',
				CollaborationEntity,
				'collaborations',
				'collaborations."shopperId" = user.id',
			)
			.leftJoinAndSelect('collaborations.brandProfile', 'collaborations__brandProfile')
			.leftJoinAndSelect(
				'collaborations__brandProfile.logo',
				'collaborations__brandProfile__logo',
			);
		addUserEngagementToQuery('user__brandProfile', qb, true);
		addUserEngagementToQuery('user__shopperProfile', qb, true);
		addHasStoryToQuery('user__shopperProfile', qb);
		addHasStoryToQuery('user__brandProfile', qb);
		const row = await qb.getOne();
		if (!row && throwIfNotFound) throw new NotFoundException('Record was not found');

		if (row !== null) {
			if (row.shopperProfile?.id === null) row.shopperProfile = null;
			if (row.brandProfile?.id === null) row.brandProfile = null;
		}

		return row;
	}

	async findOne(opts: FindOneOptions<UserEntity>, throwIfNotFound = true) {
		opts.select = opts.select || {
			id: true,
			email: true,
			phone: true,
			emailVerified: true,
			isGoogleSignin: true,
			isAppleSignin: true,
			password: true,
			firebaseId: true,
			updatedAt: true,
			createdAt: true,
			status: true,
		};

		const row = await this.dataSource.manager.findOne(UserEntity, opts);
		if (!row && throwIfNotFound) throw new NotFoundException('Record was not found');
		return row!;
	}

	// TODO: move this to auth service with and then require otp to update email/phone
	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.findOne({ where: { id } });

		if (updateUserDto.email && updateUserDto.email !== user.email) {
			if (user.isAppleSignin || user.isGoogleSignin) {
				throw new ConflictException('Email cannot be updated for social signin users');
			}
			const exists = await this.exists({ email: updateUserDto.email });
			if (exists) throw new ConflictException('Email already exists');
			user.email = updateUserDto.email;
			user.emailVerified = false;
		}
		if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
			const exists = await this.exists({ phone: updateUserDto.phone });
			if (exists) throw new ConflictException('Phone already exists');
			user.phone = updateUserDto.phone;
		}
		return this.dataSource.manager.save(user);
	}

	async adminUpdate(id: number, adminUpdateUserDto: AdminUpdateUserDto) {
		const user = await this.findOne({ where: { id } });
		if (adminUpdateUserDto.status) {
			await this.dataSource.manager.update(UserEntity, id, {
				status: adminUpdateUserDto.status,
			});
		}
		if (adminUpdateUserDto.isOutfitter != undefined) {
			if (!user.shopperProfile) {
				throw new ConflictException('User is not a shopper');
			}
			await this.dataSource.manager.update(ShopperProfileEntity, user.shopperProfile.id, {
				isOutfitter: adminUpdateUserDto.isOutfitter,
			});
		}

		return this.findOneDetailed({ id });
	}

	async updatePassword(id: number, password: string) {
		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			const updated = await tr.manager.update(UserEntity, id, {
				password,
			});
			if (!updated.affected) {
				throw new InternalServerErrorException(
					'Password was not updated. Contact support if the issue persists.',
				);
			}

			await tr.commitTransaction();
			return this.findOne({ where: { id } });
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async createBrand(createBrandDto: CreateBrandDto) {
		const isTestRun = createBrandDto.isTest ?? false;
		const user = new UserEntity();
		user.email = createBrandDto.email;
		const brandProfile = new BrandProfileEntity();
		brandProfile.storeName = createBrandDto.storeName;
		brandProfile.brandName = createBrandDto.brandName;
		brandProfile.website = createBrandDto.website!;
		brandProfile.currency = createBrandDto.currency!;
		brandProfile.storeBio = createBrandDto.storeBio!;
		brandProfile.brandManagerFullName = createBrandDto.brandManagerFullName;
		brandProfile.logoId = createBrandDto.logoId!;

		brandProfile.countries =
			createBrandDto.countriesIds?.map((id) => ({ id }) as CountryEntity) || null;
		brandProfile.categories =
			createBrandDto.categoriesIds?.map((id) => ({ id }) as CategoryEntity) || null;
		brandProfile.subCategories =
			createBrandDto.subCategoriesIds?.map((id) => ({ id }) as CategoryEntity) || null;

		const emailExists = await this.exists({ email: user.email });
		if (emailExists) throw new ConflictException('Email already exists');

		const storeNameExists = await this.dataSource.manager.exists(BrandProfileEntity, {
			where: { storeName: brandProfile.storeName },
		});
		if (storeNameExists) throw new ConflictException('Store name already exists');

		user.brandProfile = brandProfile;

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		try {
			const newUser = await tr.manager.save(UserEntity, user);
			this.authService.onboardBrand(newUser.id, newUser.email!, isTestRun);
			await tr.commitTransaction();
			return newUser;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async findAll(opts: FindManyOptions<UserEntity>) {
		const userId = this.authContext.getUser()!.sub;
		const qb = this.dataSource.manager
			.createQueryBuilder(UserEntity, 'user')
			.setFindOptions({
				loadEagerRelations: true,
				...opts,
			});
		addIsFollowingToQuery(userId, 'user', qb);
		addUserEngagementToQuery('user', qb);

		const [users, totalCount] = await qb.getManyAndCount();

		// FE needs these fields under shopperProfile/brandProfile for some reason
		users.forEach((user) => {
			const key = user.shopperProfile ? 'shopperProfile' : 'brandProfile';
			if (user[key] !== null) {
				user[key].isFollowing = user.isFollowing;
				user[key].followersCount = user.followersCount;
			}
		});

		return { users, totalCount };
	}
}
