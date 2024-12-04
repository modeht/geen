import { Module } from '@nestjs/common';
import { CountryService } from './generated-country.service'
import { CountryController } from './generated-country.controller'

@Module({
  imports:[],
  controllers:[CountryController],
  providers:[CountryService],
  exports:[CountryService],
})
export class CountryModule {}
