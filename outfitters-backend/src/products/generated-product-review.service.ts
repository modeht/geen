import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateProductReviewEntityDto } from './generated-dtos/create/create-product-review-entity.dto'
import { ProductReviewEntity } from './entities/product-review.entity'

@Injectable()
export class ProductReviewService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateProductReviewEntityDto){
				return await this.service.create(ProductReviewEntity, CreateProductReviewEntityDto, body);
			}
		
}
