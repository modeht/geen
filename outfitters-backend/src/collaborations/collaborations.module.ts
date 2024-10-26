import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersModule } from 'src/users/users.module';
import { CollaborationsController } from './collaborations.controller';
import { CollaborationsService } from './collaborations.service';

@Module({
	controllers: [CollaborationsController],
	providers: [CollaborationsService],
	imports: [UsersModule, MessagesModule, NotificationsModule],
	exports: [CollaborationsService],
})
export class CollaborationsModule {}
