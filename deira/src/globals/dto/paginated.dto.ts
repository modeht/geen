import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, Max } from 'class-validator';

export class Paginated {
  @Transform((params) => (params.value ? +params.value : 0))
  @IsNumber()
  @IsOptional()
  page?: number = 0;

  @Transform((params) => (params.value ? +params.value : 0))
  @IsNumber()
  @Max(100)
  @IsOptional()
  limit?: number = 25;
}
