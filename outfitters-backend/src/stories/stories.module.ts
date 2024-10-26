import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
	imports: [UsersModule],
	controllers: [StoriesController],
	providers: [StoriesService],
})
export class StoriesModule {}
