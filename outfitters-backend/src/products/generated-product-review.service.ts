import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddProductReviewEntityDto } from './generated-dtos/add-product-review-entity.dto'
import { ProductReviewEntity } from './entities/product-review.entity'

@Injectable()
export class ProductReviewService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddProductReviewEntityDto){
				return await this.service.create(ProductReviewEntity, AddProductReviewEntityDto, body);
			}
		
}
