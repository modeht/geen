import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateProductReviewSchema, { TCreateProductReviewSchemaInput, TCreateProductReviewSchemaOutput } from './generated-schemas//create-product-review.schema'
import UpdateProductReviewSchema, { TUpdateProductReviewSchemaInput, TUpdateProductReviewSchemaOutput } from './generated-schemas//update-product-review.schema'
import ReadProductReviewSchema, { TReadProductReviewSchemaInput, TReadProductReviewSchemaOutput } from './generated-schemas//read-product-review-query.schema'
import { ProductReviewEntity } from './entities/product-review.entity'

@Injectable()
export class ProductReviewService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateProductReviewSchemaOutput){
				return await this.service.create(ProductReviewEntity, body);
			}

			async updateRow(id: number, body: TUpdateProductReviewSchemaOutput){
				return await this.service.update(ProductReviewEntity, id, body);
			}

			async readRows(query: TReadProductReviewSchemaOutput){
				return await this.service.read(ProductReviewEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(ProductReviewEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(ProductReviewEntity, id, { soft: true });
			}
		
}
