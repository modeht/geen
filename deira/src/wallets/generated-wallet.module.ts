import { Module } from '@nestjs/common';
import { WalletService } from './generated-wallet.service';
import { WalletController } from './generated-wallet.controller';

@Module({
	imports: [],
	controllers: [WalletController],
	providers: [WalletService],
	exports: [WalletService],
})
export class WalletModule {}
