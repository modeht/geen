import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateProductReviewSchema, { TCreateProductReviewSchemaInput, TCreateProductReviewSchemaOutput } from './generated-schemas//create-product-review.schema'
import UpdateProductReviewSchema, { TUpdateProductReviewSchemaInput, TUpdateProductReviewSchemaOutput } from './generated-schemas//update-product-review.schema'
import ReadProductReviewSchema, { TReadProductReviewSchemaInput, TReadProductReviewSchemaOutput } from './generated-schemas//read-product-review-query.schema'
import { ProductReviewEntity } from './entities/product-review.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ProductReviewService } from './generated-product-review.service'

@Controller('product-review')
export class ProductReviewController {
  
  constructor(private service: ProductReviewService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateProductReview
				}
			})
			async create(
				@MoBody(CreateProductReviewSchema) body: TCreateProductReviewSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateProductReview
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateProductReviewSchema) body: TUpdateProductReviewSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadProductReviewQuery
				}
			})
			async read(
				@MoQuery(ReadProductReviewSchema) query: TReadProductReviewSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		

			@Delete(':id')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.deleteRow(+id);
			}
		

			@Delete(':id/soft')
			async softDelete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
