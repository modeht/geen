import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateAffiliationLinkTrackingSchema, { TCreateAffiliationLinkTrackingSchemaInput, TCreateAffiliationLinkTrackingSchemaOutput } from './generated-schemas//create-affiliation-link-tracking.schema'
import UpdateAffiliationLinkTrackingSchema, { TUpdateAffiliationLinkTrackingSchemaInput, TUpdateAffiliationLinkTrackingSchemaOutput } from './generated-schemas//update-affiliation-link-tracking.schema'
import ReadAffiliationLinkTrackingSchema, { TReadAffiliationLinkTrackingSchemaInput, TReadAffiliationLinkTrackingSchemaOutput } from './generated-schemas//read-affiliation-link-tracking-query.schema'
import { AffiliationLinkTrackingEntity } from './entities/affiliation-link-tracking.entity'

@Injectable()
export class AffiliationLinkTrackingService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateAffiliationLinkTrackingSchemaOutput){
				return await this.service.create(AffiliationLinkTrackingEntity, body);
			}

			async updateRow(id: number, body: TUpdateAffiliationLinkTrackingSchemaOutput){
				return await this.service.update(AffiliationLinkTrackingEntity, id, body);
			}

			async readRows(query: TReadAffiliationLinkTrackingSchemaOutput){
				return await this.service.read(AffiliationLinkTrackingEntity, query);
			}
		
}
