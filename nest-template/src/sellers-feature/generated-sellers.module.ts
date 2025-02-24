import { Module } from '@nestjs/common';
import { SellersService } from './generated-sellers.service';
import { SellersController } from './generated-sellers.controller';

@Module({
	imports: [],
	controllers: [SellersController],
	providers: [SellersService],
	exports: [SellersService],
})
export class SellersModule {}
