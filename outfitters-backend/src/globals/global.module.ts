import { Global, Module } from '@nestjs/common';
import { AbstractService } from './services/abstract-service';

@Global()
@Module({
	providers: [AbstractService],
	exports: [AbstractService],
})
export class GlobalModule {}
