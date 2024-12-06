import { Module } from '@nestjs/common';
import { RefundService } from './generated-refund.service';
import { RefundController } from './generated-refund.controller';

@Module({
	imports: [],
	controllers: [RefundController],
	providers: [RefundService],
	exports: [RefundService],
})
export class RefundModule {}
