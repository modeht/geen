import { Controller, Get, Render } from '@nestjs/common';

@Controller('ui')
export class UiController {
  constructor() {}

  @Get()
  @Render('index')
  index() {
    return {};
  }
}
