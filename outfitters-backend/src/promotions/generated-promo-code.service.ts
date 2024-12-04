import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreatePromoCodeSchema, { TCreatePromoCodeSchemaInput, TCreatePromoCodeSchemaOutput } from './generated-schemas//create-promo-code.schema'
import UpdatePromoCodeSchema, { TUpdatePromoCodeSchemaInput, TUpdatePromoCodeSchemaOutput } from './generated-schemas//update-promo-code.schema'
import ReadPromoCodeSchema, { TReadPromoCodeSchemaInput, TReadPromoCodeSchemaOutput } from './generated-schemas//read-promo-code-query.schema'
import { PromoCodeEntity } from './entities/promo-code.entity'

@Injectable()
export class PromoCodeService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreatePromoCodeSchemaOutput){
				return await this.service.create(PromoCodeEntity, body);
			}

			async updateRow(id: number, body: TUpdatePromoCodeSchemaOutput){
				return await this.service.update(PromoCodeEntity, id, body);
			}

			async readRows(query: TReadPromoCodeSchemaOutput){
				return await this.service.read(PromoCodeEntity, query);
			}
		
}
