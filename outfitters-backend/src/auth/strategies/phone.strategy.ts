import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { App } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { DataSource } from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { PreferenceEntity } from '../../preferences/entities/preference.entity';
import { ShippingAddressEntity } from '../../users/entities/shipping-address.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { FIREBASE_ADMIN, SALT_ROUNDS } from '../constants';
import {
	BrandSignUpDto,
	MobileSigninDto,
	MobileSignupDto,
	SigninDto,
	SignupDto,
} from '../dto/auth.dto';
import { AuthStrategy } from '../interfaces/auth-strategy.interface';

@Injectable()
export class PhoneAuthStrategy implements AuthStrategy {
	constructor(
		private usersService: UsersService,
		private datasource: DataSource,
		@Inject(FIREBASE_ADMIN) private firebaseAdmin: App,
	) {}

	async _verifyFirebaseIdToken(firebaseTokenId: string, phoneNumber: string) {
		let verifiedUser: DecodedIdToken;
		try {
			verifiedUser = await getAuth(this.firebaseAdmin).verifyIdToken(firebaseTokenId);
		} catch (error: any) {
			throw new UnprocessableEntityException(error.message);
		}

		if (verifiedUser.phone_number !== phoneNumber)
			throw new UnprocessableEntityException('Phone mismatch');

		return verifiedUser;
	}

	async mobileSignin(user: MobileSigninDto) {
		return this.signin(user);
	}

	async signin(user: SigninDto) {
		if (!user.identifier || !user.password) {
			throw new BadRequestException('Phone and Password are required');
		}

		const found = await this.usersService.findOne(
			{
				where: [{ email: user.identifier }, { phone: user.identifier }],
				relations: ['shopperProfile.preferences'],
			},
			false,
		);

		if (!found) throw new UnauthorizedException('Invalid credentials');

		const isCorrectPassword = compareSync(user.password, found.password);
		if (!isCorrectPassword) throw new UnauthorizedException('Invalid credentials');

		return found;
	}

	async signup(user: SignupDto) {
		if (!user.phone || !user.password) {
			throw new BadRequestException('Phone and Password are required');
		}

		const verifiedUser = await this._verifyFirebaseIdToken(
			user.firebaseTokenId,
			user.phone,
		);

		const userExists = await this.usersService.exists({ phone: user.phone });
		if (userExists) {
			throw new BadRequestException('Phone number exists');
		}

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			let newUser = await tr.manager.save(UserEntity, {
				phone: verifiedUser.phone_number,
				password: hashSync(user.password, SALT_ROUNDS),
				firebaseId: verifiedUser.sub,
				shopperProfile: {},
			});

			newUser = await tr.manager.findOne(UserEntity, {
				where: { id: newUser.id },
				relations: ['shopperProfile.preferences'],
			});

			await tr.commitTransaction();
			return newUser;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async mobileSignup(user: MobileSignupDto) {
		if (
			!user.phone ||
			!user.username ||
			!user.fullName ||
			!user.email ||
			!user.password ||
			!user.mediaId
		) {
			throw new BadRequestException(
				'Full name, Username, Email, Phone, Password and Profile Picture are required',
			);
		}

		const verifiedUser = await this._verifyFirebaseIdToken(
			user.firebaseTokenId,
			user.phone,
		);

		const phoneExists = await this.usersService.exists({ phone: user.phone });
		if (phoneExists) {
			throw new BadRequestException('Phone number exists');
		}

		const emailExists = await this.usersService.exists({ email: user.email });
		if (emailExists) {
			throw new BadRequestException('Email exists');
		}

		const usernameExists = await this.usersService.exists({
			shopperProfile: { username: user.username },
		});
		if (usernameExists) {
			throw new BadRequestException('Username exists');
		}

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			const userEntity = new UserEntity();
			userEntity.phone = verifiedUser.phone_number;
			userEntity.email = user.email;
			userEntity.password = hashSync(user.password, SALT_ROUNDS);
			userEntity.firebaseId = verifiedUser.sub;
			userEntity.following = user.brandsIds?.map((id) => ({ id }) as UserEntity) || [];

			userEntity.shopperProfile = new ShopperProfileEntity();
			userEntity.shopperProfile.username = user.username;
			userEntity.shopperProfile.fullName = user.fullName;
			userEntity.shopperProfile.profilePicture = { id: user.mediaId } as MediaEntity;
			userEntity.shopperProfile.dateOfBirth = user.dateOfBirth;
			userEntity.shopperProfile.gender = user.gender;
			userEntity.shopperProfile.addresses = [
				{
					country: user.country,
					city: user.city,
					isDefault: true,
				} as ShippingAddressEntity,
			];
			userEntity.shopperProfile.preferences = user.preferencesIds?.map(
				(id) => ({ id }) as PreferenceEntity,
			);
			const row = await tr.manager.save(UserEntity, userEntity);
			const newUser = await tr.manager.findOne(UserEntity, { where: { id: row.id } });

			await tr.commitTransaction();
			return newUser;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async brandSignup(brandSignUpDto: BrandSignUpDto, id: number) {
		const { firebaseTokenId, password, phone } = brandSignUpDto;
		const verifiedUser = await this._verifyFirebaseIdToken(firebaseTokenId, phone);
		const user = await this.usersService.findOne({
			where: { id },
		});

		if (user.password) throw new UnauthorizedException('Brand already setup');
		const phoneExists = await this.usersService.exists({
			phone: verifiedUser.phone_number,
		});
		if (phoneExists) throw new BadRequestException('Phone number exists');

		user.phone = verifiedUser.phone_number;
		user.firebaseId = verifiedUser.sub;
		user.password = hashSync(password, SALT_ROUNDS);
		await this.datasource.manager.save(user);
		return user;
	}
}
