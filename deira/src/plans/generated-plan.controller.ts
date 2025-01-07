import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { PlanService } from './generated-plan.service';

@Controller('plan')
export class PlanController {
	constructor(private service: PlanService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreatePlan,
		},
	})
	async create(@MoBody(CreatePlanSchema) body: TCreatePlanSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdatePlan,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdatePlanSchema) body: TUpdatePlanSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadPlanQuery,
		},
	})
	async read(@MoQuery(ReadPlanSchema) query: TReadPlanSchemaOutput) {
		return this.service.readRows(query);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRow(+id);
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		return this.service.softDeleteRow(+id);
	}
}
