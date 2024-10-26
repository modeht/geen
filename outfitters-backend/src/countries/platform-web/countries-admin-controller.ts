import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Paginated } from '../../globals/dto/paginated.dto';
import { CountriesService } from '../countires.service';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';

@ApiTags('Web/admin/Countires')
@Controller('web/admin/countires')
// TODO: Adjust to admin role
@UseGuards(AuthGuard)
export class CountriesAdminController {
	constructor(private readonly countiresService: CountriesService) {}

	@Get()
	getAll(@Query() paginated: Paginated) {
		return this.countiresService.findAll({
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}

	@Post()
	create(@Body() createCountryDto: CreateCountryDto) {
		return this.countiresService.create(createCountryDto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
		return this.countiresService.update(+id, updateCountryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.countiresService.remove(+id);
	}
}
