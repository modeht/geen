import { Module } from '@nestjs/common';
import { UsersService } from './generated-users.service';
import { UsersController } from './generated-users.controller';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
