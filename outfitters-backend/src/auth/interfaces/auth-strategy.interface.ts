import { UserEntity } from '../../users/entities/user.entity';

export interface AuthStrategy {
	signin: (...args: any[]) => Promise<Partial<UserEntity>>;
	signup: (...args: any[]) => Promise<Partial<UserEntity>>;
	mobileSignup: (...args: any[]) => Promise<Partial<UserEntity>>;
	mobileSignin: (...args: any[]) => Promise<Partial<UserEntity>>;
	brandSignup?: (...args: any[]) => Promise<Partial<UserEntity>>;
}

export enum AuthStratOptions {
	Google = 'google',
	Apple = 'apple',
	Phone = 'phone',
}
