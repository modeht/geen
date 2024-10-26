import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginated } from '../globals/dto/paginated.dto';
import { PreferencesService } from './preferences.service';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferencesController {
	constructor(private readonly preferencesService: PreferencesService) {}

	@Get()
	findAll(@Query() paginated: Paginated) {
		return this.preferencesService.findAll(paginated);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.preferencesService.findOne(+id);
	}
}
