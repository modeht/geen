import { Transform } from 'class-transformer';
import { IsAlpha, IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
	@IsAlpha()
	@Transform(({ value }) => value.toLowerCase())
	name: string;

	@IsAlpha()
	@Transform(({ value }) => value.toLowerCase())
	code: string;

	@IsString()
	dialCode: string;

	@IsNumber()
	iconId: number;
}
