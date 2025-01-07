import { Module } from '@nestjs/common';
import { WalletLogService } from './generated-wallet-log.service';
import { WalletLogController } from './generated-wallet-log.controller';

@Module({
	imports: [],
	controllers: [WalletLogController],
	providers: [WalletLogService],
	exports: [WalletLogService],
})
export class WalletLogModule {}
