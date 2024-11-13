import { Controller, Post, Body } from '@nestjs/common';
import { CreateTranslationEntityDto } from './generated-dtos/create/create-translation-entity.dto'
import { TranslationService } from './generated-translation.service'

@Controller('translation')
export class TranslationController {
  
  constructor(private service: TranslationService){}
  
			@Post()
			async create(@Body() body: CreateTranslationEntityDto){
				return this.service.createRow(body);
			}
		
}
