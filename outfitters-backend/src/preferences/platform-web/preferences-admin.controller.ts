import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { CreatePreferenceDto } from '../dto/create-preference.dto';
import { UpdatePreferenceDto } from '../dto/update-preference.dto';
import { PreferencesService } from '../preferences.service';

@ApiTags('Web/admin/Preferences')
@Controller('web/admin/preferences')
@UseGuards(AuthGuard, RoleGuard)
export class PreferencesAdminController {
	constructor(private readonly preferencesService: PreferencesService) {}

	@Post()
	// TODO: @Roles([Role.Admin])
	@Roles(['*'])
	create(@Body() createPreferenceDto: CreatePreferenceDto) {
		return this.preferencesService.create(createPreferenceDto);
	}

	@Patch(':id')
	@Roles(['*'])
	update(@Param('id') id: string, @Body() updatePreferenceDto: UpdatePreferenceDto) {
		return this.preferencesService.update(+id, updatePreferenceDto);
	}

	@Delete(':id')
	@Roles(['*'])
	remove(@Param('id') id: string) {
		return this.preferencesService.remove(+id);
	}
}
