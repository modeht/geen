import { Module } from '@nestjs/common';
import { CountriesService } from './countires.service';
import { CountriesController } from './countries.controller';
import { CountriesAdminController } from './platform-web/countries-admin-controller';

@Module({
	controllers: [CountriesController, CountriesAdminController],
	providers: [CountriesService],
})
export class CountriesModule {}
