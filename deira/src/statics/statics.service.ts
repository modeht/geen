import { Injectable } from '@nestjs/common';
import { CreateContactsDto, CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { DataSource } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.types';
import { StaticEntity } from './entities/static.entity';

@Injectable()
export class StaticsService {
  constructor(
    private datasource: DataSource,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  async createContacts(payload: CreateContactsDto) {
    let row = await this.findTheOne();
    if (!row) {
      await this.datasource.manager.insert(StaticEntity, {
        whatsapp: payload.whatsapp,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        facebook: payload.facebook,
        x: payload.x,
        instagram: payload.instagram,
      });
    } else {
      row = {
        ...row,
        whatsapp: payload.whatsapp,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        facebook: payload.facebook,
        x: payload.x,
        instagram: payload.instagram,
      };
      await this.datasource.manager.save(StaticEntity, row);
    }
    return this.findTheOne();
  }

  findAll() {
    return `This action returns all statics`;
  }

  findContacts() {
    return this.datasource.manager.findOne(StaticEntity, {
      where: {},
      select: {
        phoneNumber: true,
        whatsapp: true,
        email: true,
        facebook: true,
        instagram: true,
        x: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} static`;
  }

  findTheOne() {
    return this.datasource.manager.findOne(StaticEntity, {
      where: {},
      order: {
        id: 'DESC',
      },
    });
  }
  update(id: number, updateStaticDto: UpdateStaticDto) {
    return `This action updates a #${id} static`;
  }

  remove(id: number) {
    return `This action removes a #${id} static`;
  }
}
