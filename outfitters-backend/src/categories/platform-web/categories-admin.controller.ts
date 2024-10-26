import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@ApiTags('Web/admin/Categories')
@Controller('web/admin/categories')
@UseGuards(AuthGuard, RoleGuard)
export class CategoriesAdminController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	// @Roles([Role.Admin]) //TODO: fix this
	@Roles(['*'])
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@Delete(':id')
	// @Roles([Role.Admin])
	@Roles(['*'])
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}

	@Put(':id')
	@Roles(['*'])
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}
}
