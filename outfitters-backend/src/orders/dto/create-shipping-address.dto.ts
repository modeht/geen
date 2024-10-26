import { IsOptional, IsString } from 'class-validator';

export class CreateShippingAddressDto {
	@IsString()
	latitude: string;

	@IsString()
	longitude: string;

	@IsString()
	country: string;

	@IsString()
	city: string;

	@IsString()
	street: string;

	@IsString()
	building: string;

	@IsString()
	apartment: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	floor: string;

	@IsString()
	@IsOptional()
	address: string;
}
