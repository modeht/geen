import { Module } from '@nestjs/common';
import { ProfilesService } from './generated-profiles.service';
import { ProfilesController } from './generated-profiles.controller';

@Module({
	imports: [],
	controllers: [ProfilesController],
	providers: [ProfilesService],
	exports: [ProfilesService],
})
export class ProfilesModule {}
