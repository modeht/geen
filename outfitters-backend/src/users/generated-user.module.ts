import { Module } from '@nestjs/common';
import { UserService } from './generated-user.service'
import { UserController } from './generated-user.controller'

@Module({
  imports:[],
  controllers:[UserController],
  providers:[UserService],
  exports:[UserService],
})
export class UserModule {}
