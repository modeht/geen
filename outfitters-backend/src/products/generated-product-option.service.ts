import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateProductOptionSchema, { TCreateProductOptionSchemaInput, TCreateProductOptionSchemaOutput } from './generated-schemas//create-product-option.schema'
import UpdateProductOptionSchema, { TUpdateProductOptionSchemaInput, TUpdateProductOptionSchemaOutput } from './generated-schemas//update-product-option.schema'
import ReadProductOptionSchema, { TReadProductOptionSchemaInput, TReadProductOptionSchemaOutput } from './generated-schemas//read-product-option-query.schema'
import { ProductOptionEntity } from './entities/product-option.entity'

@Injectable()
export class ProductOptionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateProductOptionSchemaOutput){
				return await this.service.create(ProductOptionEntity, body);
			}

			async updateRow(id: number, body: TUpdateProductOptionSchemaOutput){
				return await this.service.update(ProductOptionEntity, id, body);
			}

			async readRows(query: TReadProductOptionSchemaOutput){
				return await this.service.read(ProductOptionEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(ProductOptionEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(ProductOptionEntity, id, { soft: true });
			}
		
}
