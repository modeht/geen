import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get('me')
	@UseGuards(AuthGuard)
	findMyNotifications(@Query() paginated: Paginated) {
		return this.notificationsService.findAll(paginated);
	}
}
