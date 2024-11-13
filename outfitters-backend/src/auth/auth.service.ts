import {
	BadRequestException,
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
	UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { EmailService } from '../email/email.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';
import { AuthContext } from './auth.context';
import { SALT_ROUNDS } from './constants';
import {
	BrandSignUpDto,
	ChangePasswordDto,
	ForgotPasswordDto,
	MobileSigninDto,
	MobileSignupDto,
	Platform,
	ResetPasswordDto,
	SigninDto,
	SignupDto,
	ValidateAuthDto,
	ValidateAuthReturnDto,
} from './dto/auth.dto';
import { AuthStrategy, AuthStratOptions } from './interfaces/auth-strategy.interface';
import { AppleAuthStrategy } from './strategies/apple.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { PhoneAuthStrategy } from './strategies/phone.strategy';
import { Role, SessionToken } from './types';

@Injectable()
export class AuthService {
	private authStrategy: AuthStrategy;
	constructor(
		private jwtService: JwtService,
		private authContext: AuthContext,
		private moduleRef: ModuleRef,
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		private configService: ConfigService,
		private emailService: EmailService,
	) {}

	private async _setAuthStrategy(strat: AuthStratOptions) {
		switch (strat) {
			case AuthStratOptions.Phone:
				this.authStrategy = await this.moduleRef.resolve(PhoneAuthStrategy);
				break;
			case AuthStratOptions.Google:
				this.authStrategy = await this.moduleRef.resolve(GoogleAuthStrategy);
				break;
			case AuthStratOptions.Apple:
				this.authStrategy = await this.moduleRef.resolve(AppleAuthStrategy);
				break;
			default:
				throw new UnprocessableEntityException('Auth stratgey not supported');
		}
	}
	_getRole(user: Partial<UserEntity>) {
		let role: Role;
		if (user.brandProfile) {
			role = Role.Brand;
		} else if (user.shopperProfile?.isOutfitter) {
			role = Role.Outfitter;
		} else if (user.shopperProfile) {
			role = Role.Shopper;
		} else {
			throw new BadRequestException('Failed to retrieve user, please contact support');
		}
		user.role = role;
		return role;
	}

	_genToken(user: Partial<UserEntity>) {
		const token = this.jwtService.sign(
			{
				sub: user.id,
				firebaseId: user.firebaseId,
				phone: user.phone,
				role: this._getRole(user),
			} satisfies SessionToken,
			{ expiresIn: '30d' },
		);
		return token;
	}

	async signin(payload: SigninDto) {
		await this._setAuthStrategy(payload.strategy);
		const user = await this.authStrategy.signin(payload);
		const token = this._genToken(user);
		return { token, user: user };
	}

	async mobileSignin(signinUser: MobileSigninDto) {
		await this._setAuthStrategy(signinUser.strategy);
		const user = await this.authStrategy.mobileSignin(signinUser);
		const token = this._genToken(user);
		return { token, user: user };
	}

	async signup(payload: SignupDto) {
		await this._setAuthStrategy(AuthStratOptions.Phone);
		const newUser = await this.authStrategy.signup(payload);
		const token = this._genToken(newUser);
		return { token, user: newUser };
	}

	async mobileSignup(user: MobileSignupDto) {
		await this._setAuthStrategy(AuthStratOptions.Phone);
		const newUser = await this.authStrategy.mobileSignup(user);
		const token = this._genToken(newUser);
		return { token, user: newUser };
	}

	async forgotPassword(payload: ForgotPasswordDto) {
		const user = await this.usersService.findOne(
			{ where: { email: payload.email } },
			false,
		);

		let ableToSend = true;
		if (!user) {
			ableToSend = false;
		}

		if (ableToSend) {
			const token = await this.jwtService.signAsync(
				{ sub: user.id, email: user.email },
				{ secret: this.configService.getOrThrow('JWT_SECRET') },
			);

			let link = '';
			if (payload.platform === Platform.Mobile) {
				link = `${this.configService.getOrThrow('MOBILE_BASE_URL')}&token=${token}`;
			} else if (payload.platform === Platform.Web) {
				link = `${this.configService.getOrThrow(
					`${payload.test ? 'LOCAL_' : ''}WEB_BASE_URL`,
				)}/forgot-password?token=${token}`;
			}

			const template = this.emailService.createEmailObject({
				to: user.email,
				subject: 'Outfitters Password Recovery',
				html: `<h1>A request for recovering password was sent to this email!<br/>
        If this was not requested by you can ignore the rest of this email.<br/>
        You can continue using the following link<br/>
        </h1>
        <a href="${link}">${link}</a>`,
			});
			await this.emailService.sendEmail(template);
		}

		return 'If an account exists with this email, instructions to reset your password will be sent to your inbox.';
	}

	async resetPassword(payload: ResetPasswordDto) {
		let session: SessionToken;
		try {
			session = this.jwtService.verify<SessionToken>(payload.token, {
				secret: this.configService.getOrThrow('JWT_SECRET'),
			});
		} catch (error) {
			throw new BadRequestException('Failed to verify token');
		}

		const user = await this.usersService.updatePassword(
			session.sub,
			hashSync(payload.password, SALT_ROUNDS),
		);

		const token = this._genToken(user);

		return {
			user,
			token,
		};
	}
	async changePassword(payload: ChangePasswordDto) {
		const userExists = await this.usersService.findOne(
			{
				where: {
					id: this.authContext.getUser()!.sub,
				},
			},
			false,
		);
		const isCorrectPassword = compareSync(payload.currentPassword, userExists.password);

		if (!isCorrectPassword) throw new ForbiddenException('Invalid credentials');

		const user = await this.usersService.updatePassword(
			userExists.id,
			hashSync(payload.newPassword, SALT_ROUNDS),
		);

		const token = this._genToken(user);

		return {
			user,
			token,
		};
	}

	async onboardBrand(sub: number, email: string, test = false) {
		const token = await this.jwtService.signAsync(
			{ sub },
			{ secret: this.configService.getOrThrow('JWT_SECRET') },
		);

		const link = `${this.configService.getOrThrow(
			`${test ? 'LOCAL_' : ''}WEB_BASE_URL`,
		)}/#/brand/signUp?token=${token}`;

		const template = this.emailService.createEmailObject({
			to: email,
			subject: 'Welcome to Outfitters',
			html: `<h1> Welcom to Outfitters<br/>
			We are excited to have you on board<br/>
			Please click the link below to set your login credentials<br/></h1>
			<a href="${link}">${link}</a>`,
		});
		await this.emailService.sendEmail(template);
	}
	async brandSignup(payload: BrandSignUpDto) {
		let session: SessionToken;
		try {
			session = this.jwtService.verify<SessionToken>(payload.token, {
				secret: this.configService.getOrThrow('JWT_SECRET'),
			});
		} catch (error) {
			throw new BadRequestException('Failed to verify token');
		}
		await this._setAuthStrategy(AuthStratOptions.Phone);
		const newUser = await this.authStrategy.brandSignup(payload, session.sub);
		const token = this._genToken(newUser);
		return { token, user: newUser };
	}

	async validatePhoneOrEmailOrUsername(
		query: ValidateAuthDto,
	): Promise<ValidateAuthReturnDto> {
		if (query.email) {
			const userExists = await this.usersService.exists({ email: query.email });
			if (userExists) {
				return { available: false, message: 'Email already exists' };
			}
		}

		if (query.phone) {
			const userExists = await this.usersService.exists({ phone: query.phone });
			if (userExists) {
				return { available: false, message: 'Phone already exists' };
			}
		}

		if (query.username) {
			const userExists = await this.usersService.exists({
				shopperProfile: { username: query.username },
			});
			if (userExists) {
				return { available: false, message: 'Username already exists' };
			}
		}

		return { available: true, message: 'Valid phone, email and username' };
	}
}
