import { Module } from '@nestjs/common';
import { PreferenceService } from './generated-preference.service';
import { PreferenceController } from './generated-preference.controller';

@Module({
	imports: [],
	controllers: [PreferenceController],
	providers: [PreferenceService],
	exports: [PreferenceService],
})
export class PreferenceModule {}
