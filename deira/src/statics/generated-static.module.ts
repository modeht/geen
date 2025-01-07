import { Module } from '@nestjs/common';
import { StaticService } from './generated-static.service';
import { StaticController } from './generated-static.controller';

@Module({
	imports: [],
	controllers: [StaticController],
	providers: [StaticService],
	exports: [StaticService],
})
export class StaticModule {}
