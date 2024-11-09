import { Controller, Post, Body } from '@nestjs/common';
import { AddTranslationEntityDto } from './generated-dtos/create/create-translation-entity.dto'
import { TranslationService } from './generated-translation.service'

@Controller('translation')
export class TranslationController {
  
  constructor(private service: TranslationService){}
  
			@Post()
			async create(@Body() body: AddTranslationEntityDto){
				return this.service.createRow(body);
			}
		
}
