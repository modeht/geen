import { IsString } from 'class-validator';

export class CreateStaticDto {}
export class CreateContactsDto {
  @IsString()
  whatsapp: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;
  @IsString()
  facebook: string;

  @IsString()
  x: string;
  @IsString()
  instagram: string;
}
