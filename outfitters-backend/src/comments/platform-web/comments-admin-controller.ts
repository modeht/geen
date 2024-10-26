import { Controller, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { CommentsService } from '../comments.service';

@ApiTags('Web/admin/Comments')
@Controller('web/admin/comments')
@UseGuards(AuthGuard, RoleGuard)
export class CommentsAdminController {
	constructor(private readonly commentsService: CommentsService) {}

	@Delete(':id')
	// @Roles([Role.Admin])
	@Roles(['*'])
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.commentsService.adminRemove(id);
	}
}
