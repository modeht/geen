import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateBrandProfileSchema, { TCreateBrandProfileSchemaInput, TCreateBrandProfileSchemaOutput } from './generated-schemas//create-brand-profile.schema'
import UpdateBrandProfileSchema, { TUpdateBrandProfileSchemaInput, TUpdateBrandProfileSchemaOutput } from './generated-schemas//update-brand-profile.schema'
import ReadBrandProfileSchema, { TReadBrandProfileSchemaInput, TReadBrandProfileSchemaOutput } from './generated-schemas//read-brand-profile-query.schema'
import { BrandProfileEntity } from './entities/brand-profile.entity'

@Injectable()
export class BrandProfileService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateBrandProfileSchemaOutput){
				return await this.service.create(BrandProfileEntity, body);
			}

			async updateRow(id: number, body: TUpdateBrandProfileSchemaOutput){
				return await this.service.update(BrandProfileEntity, id, body);
			}

			async readRows(query: TReadBrandProfileSchemaOutput){
				return await this.service.read(BrandProfileEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(BrandProfileEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(BrandProfileEntity, id, { soft: true });
			}
		
}
