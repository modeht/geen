import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateAffiliationLinkSchema, {
	TCreateAffiliationLinkSchemaInput,
	TCreateAffiliationLinkSchemaOutput,
} from './generated-schemas//create-affiliation-link.schema';
import UpdateAffiliationLinkSchema, {
	TUpdateAffiliationLinkSchemaInput,
	TUpdateAffiliationLinkSchemaOutput,
} from './generated-schemas//update-affiliation-link.schema';
import ReadAffiliationLinkSchema, {
	TReadAffiliationLinkSchemaInput,
	TReadAffiliationLinkSchemaOutput,
} from './generated-schemas//read-affiliation-link-query.schema';
import { AffiliationLinkEntity } from './entities/affiliation-link.entity';

@Injectable()
export class AffiliationLinkService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateAffiliationLinkSchemaOutput) {
		return await this.service.create(AffiliationLinkEntity, body);
	}

	async updateRow(id: number, body: TUpdateAffiliationLinkSchemaOutput) {
		return await this.service.update(AffiliationLinkEntity, id, body);
	}

	async readRows(query: TReadAffiliationLinkSchemaOutput) {
		return await this.service.read(AffiliationLinkEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(AffiliationLinkEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(AffiliationLinkEntity, id, { soft: true });
	}
}
