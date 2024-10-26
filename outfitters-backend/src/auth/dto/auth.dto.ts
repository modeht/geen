import { Transform } from 'class-transformer';
import {
	IsAlphanumeric,
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { GenderEnum } from '../../users/entities/shopper-profile.entity';
import { AuthStratOptions } from '../interfaces/auth-strategy.interface';

export class SigninDto {
	@IsEnum(AuthStratOptions)
	strategy: AuthStratOptions;

	@IsString()
	@MinLength(1)
	@IsOptional()
	identifier?: string | null;

	@IsString()
	@IsOptional()
	@MinLength(6)
	password?: string | null;

	@IsString()
	@IsOptional()
	@MinLength(1)
	firebaseTokenId?: string | null;
}

export class MobileSigninDto {
	@IsEnum(AuthStratOptions)
	strategy: AuthStratOptions;

	@IsString()
	@IsOptional()
	@MinLength(1)
	identifier?: string | null;

	@IsString()
	@MinLength(6)
	@IsOptional()
	password?: string | null;

	@IsString()
	@IsOptional()
	@MinLength(1)
	firebaseTokenId?: string | null;
}

export class SignupDto {
	@IsString()
	@IsOptional()
	@MinLength(1)
	phone?: string | null;

	@IsString()
	@MinLength(1)
	firebaseTokenId: string;

	@IsString()
	@IsOptional()
	@MinLength(6)
	password?: string | null;
}

export class MobileSignupDto {
	@IsString()
	@MinLength(1)
	phone: string;

	@IsNumber()
	mediaId: number;

	@IsString()
	@IsAlphanumeric()
	@MinLength(3)
	@MaxLength(30)
	username: string;

	@IsString()
	@MinLength(1)
	fullName: string;

	@IsEmail({}, { message: 'Please enter a valid email.' })
	email: string;

	@IsString()
	@MinLength(1)
	firebaseTokenId: string;

	@IsDate()
	@Transform((params) => new Date(params.value))
	@IsOptional()
	dateOfBirth?: Date | null;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@IsOptional()
	@MinLength(1)
	country?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	city?: string | null;

	@IsEnum(GenderEnum)
	@IsOptional()
	gender?: GenderEnum | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	preferencesIds?: number[] | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	brandsIds?: number[] | null;
}

export enum Platform {
	Mobile = 'mobile',
	Web = 'web',
}

export class ForgotPasswordDto {
	@IsBoolean()
	@IsOptional()
	test?: boolean = true;

	@IsEmail({}, { message: 'Please enter a valid email.' })
	email: string;

	@IsEnum(Platform)
	platform: Platform;
}

export class ChangePasswordDto {
	@IsString()
	@MinLength(6)
	currentPassword: string;

	@IsString()
	@MinLength(6)
	newPassword: string;
}

export class ResetPasswordDto {
	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@MinLength(1)
	token: string;
}

export class ValidateAuthDto {
	@IsString()
	@IsOptional()
	phone?: string | null;

	@IsEmail({}, { message: 'Please enter a valid email.' })
	@IsOptional()
	email?: string | null;

	@IsString()
	@IsOptional()
	username?: string | null;
}

export class ValidateAuthReturnDto {
	@IsBoolean()
	available: boolean;
	@IsString()
	message: string;
}

export class BrandSignUpDto {
	@IsString()
	@MinLength(1)
	token: string;

	@IsString()
	@MinLength(1)
	phone?: string | null;

	@IsString()
	@MinLength(1)
	firebaseTokenId: string;

	@IsString()
	@MinLength(6)
	password?: string | null;
}
