import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsEmail({}, { message: 'Please enter a valid email.' })
	email?: string;

	@IsOptional()
	@IsString()
	phone?: string;
}
