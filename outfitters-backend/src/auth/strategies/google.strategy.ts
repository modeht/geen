import {
	BadRequestException,
	Inject,
	Injectable,
	UnprocessableEntityException,
} from '@nestjs/common';
import { App } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { DataSource } from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { FIREBASE_ADMIN } from '../constants';
import { MobileSigninDto, MobileSignupDto, SigninDto, SignupDto } from '../dto/auth.dto';
import { AuthStrategy } from '../interfaces/auth-strategy.interface';

@Injectable()
export class GoogleAuthStrategy implements AuthStrategy {
	constructor(
		private usersService: UsersService,
		private datasource: DataSource,
		@Inject(FIREBASE_ADMIN) private firebaseAdmin: App,
	) {}

	mobileSignin(payload: MobileSigninDto) {
		return this.signin(payload);
	}

	mobileSignup(payload: MobileSignupDto) {
		return this.signin(payload);
	}

	async signin(user: SigninDto | MobileSignupDto | SignupDto | MobileSigninDto) {
		if (!user.firebaseTokenId) {
			throw new BadRequestException(
				process.env.NODE_ENV !== 'production'
					? 'Firebase token id is required'
					: 'Application error. Please contact support',
			);
		}

		let verifiedUser: DecodedIdToken;
		try {
			verifiedUser = await getAuth(this.firebaseAdmin).verifyIdToken(
				user.firebaseTokenId,
			);
		} catch (error: any) {
			throw new UnprocessableEntityException(error.message);
		}
		const userExists = await this.usersService.findOne(
			{
				where: { firebaseId: verifiedUser.sub },
				relations: ['shopperProfile.preferences'],
			},
			false,
		);

		if (userExists) {
			return userExists;
		}

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			let profilePicture: MediaEntity | null = null;
			if (verifiedUser.picture) {
				const media = await tr.manager.insert(MediaEntity, {
					url: verifiedUser.picture,
				});
				profilePicture = {
					id: media.identifiers[0].id,
				} as MediaEntity;
			}
			const row = await tr.manager.save(UserEntity, {
				phone: verifiedUser.phone || verifiedUser.phone_number || null,
				email: verifiedUser.email || null,
				emailVerified: verifiedUser.email_verified,
				firebaseId: verifiedUser.sub,
				isGoogleSignin: true,
				shopperProfile: {
					username: verifiedUser.name || null,
					profilePicture,
				},
			});

			const newUser = await tr.manager.findOne(UserEntity, {
				where: { id: row.id },
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

	signup(payload: SignupDto) {
		return this.signin(payload);
	}
}
