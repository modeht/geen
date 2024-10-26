import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginated } from '../globals/dto/paginated.dto';
import { CountriesService } from './countires.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	findSupported(@Query() paginated: Paginated) {
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}
}
