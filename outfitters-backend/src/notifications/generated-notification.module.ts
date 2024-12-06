import { Module } from '@nestjs/common';
import { NotificationService } from './generated-notification.service';
import { NotificationController } from './generated-notification.controller';

@Module({
	imports: [],
	controllers: [NotificationController],
	providers: [NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
