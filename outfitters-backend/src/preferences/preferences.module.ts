import { Module } from '@nestjs/common';
import { PreferencesAdminController } from './platform-web/preferences-admin.controller';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';

@Module({
	controllers: [PreferencesController, PreferencesAdminController],
	providers: [PreferencesService],
})
export class PreferencesModule {}
