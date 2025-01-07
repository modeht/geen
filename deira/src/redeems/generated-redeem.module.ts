import { Module } from '@nestjs/common';
import { RedeemService } from './generated-redeem.service';
import { RedeemController } from './generated-redeem.controller';

@Module({
	imports: [],
	controllers: [RedeemController],
	providers: [RedeemService],
	exports: [RedeemService],
})
export class RedeemModule {}
