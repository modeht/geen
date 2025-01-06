import { Controller, Get } from '@nestjs/common';
import { StaticsService } from './statics.service';

@Controller('app/statics')
export class AppStaticsController {
  constructor(private readonly staticsService: StaticsService) {}

  @Get('contacts')
  findContacts() {
    return this.staticsService.findContacts();
  }
}
