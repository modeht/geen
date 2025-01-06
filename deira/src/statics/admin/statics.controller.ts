import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaticsService } from '../statics.service';
import { CreateContactsDto, CreateStaticDto } from '../dto/create-static.dto';
import { UpdateStaticDto } from '../dto/update-static.dto';

@Controller('admin/statics')
export class AdminStaticsController {
  constructor(private readonly staticsService: StaticsService) {}

  @Post('contacts')
  createContacts(@Body() body: CreateContactsDto) {
    return this.staticsService.createContacts(body);
  }

  @Get()
  findAll() {
    return this.staticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticDto: UpdateStaticDto) {
    return this.staticsService.update(+id, updateStaticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticsService.remove(+id);
  }
}
