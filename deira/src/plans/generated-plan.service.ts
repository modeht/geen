import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreatePlanSchema, {
	TCreatePlanSchemaInput,
	TCreatePlanSchemaOutput,
} from './generated-schemas//create-plan.schema';
import UpdatePlanSchema, {
	TUpdatePlanSchemaInput,
	TUpdatePlanSchemaOutput,
} from './generated-schemas//update-plan.schema';
import ReadPlanSchema, {
	TReadPlanSchemaInput,
	TReadPlanSchemaOutput,
} from './generated-schemas//read-plan-query.schema';
import { PlanEntity } from './entities/plan.entity';

@Injectable()
export class PlanService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreatePlanSchemaOutput) {
		return await this.service.create(PlanEntity, body);
	}

	async updateRow(id: number, body: TUpdatePlanSchemaOutput) {
		return await this.service.update(PlanEntity, id, body);
	}

	async readRows(query: TReadPlanSchemaOutput) {
		return await this.service.read(PlanEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(PlanEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(PlanEntity, id, { soft: true });
	}
}
