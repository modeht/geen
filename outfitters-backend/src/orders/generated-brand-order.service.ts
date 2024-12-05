import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateBrandOrderSchema, { TCreateBrandOrderSchemaInput, TCreateBrandOrderSchemaOutput } from './generated-schemas//create-brand-order.schema'
import UpdateBrandOrderSchema, { TUpdateBrandOrderSchemaInput, TUpdateBrandOrderSchemaOutput } from './generated-schemas//update-brand-order.schema'
import ReadBrandOrderSchema, { TReadBrandOrderSchemaInput, TReadBrandOrderSchemaOutput } from './generated-schemas//read-brand-order-query.schema'
import { BrandOrderEntity } from './entities/brand-orders.entity'

@Injectable()
export class BrandOrderService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateBrandOrderSchemaOutput){
				return await this.service.create(BrandOrderEntity, body);
			}

			async updateRow(id: number, body: TUpdateBrandOrderSchemaOutput){
				return await this.service.update(BrandOrderEntity, id, body);
			}

			async readRows(query: TReadBrandOrderSchemaOutput){
				return await this.service.read(BrandOrderEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(BrandOrderEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(BrandOrderEntity, id, { soft: true });
			}
		
}
