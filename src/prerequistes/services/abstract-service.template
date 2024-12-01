import { DataSource, EntitySchema } from 'typeorm';
import {
	Injectable,
	InternalServerErrorException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { metadataSymbol, modelSymbol } from '../constants/schema-symbols';
import { PostgresErrorCode } from '../constants/pg-error-codes';
import { createRelations } from '../lib/create-relations';
import { createWhere } from '../lib/create-where';

export type CreateOptions = {
	//
};

export type UpdateOptions = {
	//
};

export type ReadOptions = {
	depth?: number;
};

@Injectable()
export class AbstractService {
	constructor(private datasource: DataSource) {}

	async create(body: Record<string | symbol, any>, options: CreateOptions = {}) {
		try {
			const metadata = body[metadataSymbol];
			const entityName = metadata[modelSymbol];
			const row = {} as any;

			for (const key in body) {
				let val = body[key];
				const relatedEntityName = metadata[key];
				if (relatedEntityName) {
					val = await this.datasource.manager.save(relatedEntityName, val);
				}
				row[key] = val;
			}
			const created: any = await this.datasource.manager.save(entityName, row);
			return this.datasource.manager.findOne(entityName, { where: { id: created.id } });
		} catch (error: any) {
			//handle known pg errros
			const pgError = PostgresErrorCode[error.code];
			if (pgError) {
				throw new UnprocessableEntityException(pgError, {
					description: 'Database exception',
					cause: error,
				});
			}

			throw new InternalServerErrorException(error.message);
		}
	}

	async update(
		id: number,
		body: Record<string | symbol, any>,
		options: UpdateOptions = {},
	) {
		try {
			const metadata = body[metadataSymbol];
			const entityName = metadata[modelSymbol];
			const row = {} as any;

			for (const key in body) {
				let val = body[key];
				const relatedEntityName = metadata[key];
				if (relatedEntityName) {
					val = await this.datasource.manager.save(relatedEntityName, val);
				}
				row[key] = val;
			}
			const created: any = await this.datasource.manager.save(entityName, id, row);
			return this.datasource.manager.findOne(entityName, { where: { id: created.id } });
		} catch (error: any) {
			//handle known pg errros
			const pgError = PostgresErrorCode[error.code];
			if (pgError) {
				throw new UnprocessableEntityException(pgError, {
					description: 'Database exception',
					cause: error,
				});
			}

			throw new InternalServerErrorException(error.message);
		}
	}

	async read(
		entity: EntitySchema,
		query: Record<string, any>,
		options: ReadOptions = { depth: 0 },
	) {
		try {
			const where = createWhere(query);
			const relations = createRelations(query, { depth: options.depth });
			const order = query['orders'];
			const pagination = query['pagination'];

			return this.datasource.manager.find(entity, {
				where,
				relations,
				order,
				...pagination,
			});
		} catch (error: any) {
			//handle known pg errros
			const pgError = PostgresErrorCode[error.code];
			if (pgError) {
				throw new UnprocessableEntityException(pgError, {
					description: 'Database exception',
					cause: error,
				});
			}

			throw new InternalServerErrorException(error.message);
		}
	}
}
