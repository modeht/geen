import { DataSource, EntitySchema, EntityTarget, ObjectLiteral } from 'typeorm';
import {
	HttpException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
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

	async create<T extends ObjectLiteral>(
		entity: EntityTarget<T>,
		body: Record<string | symbol, any>,
		options: CreateOptions = {},
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
			const created: any = await this.datasource.manager.save(entityName, row);
			return this.datasource.manager.findOne(entity, { where: { id: created.id } });
		} catch (error: any) {
			//handle known pg errros
			const pgError = PostgresErrorCode[error.code];
			if (pgError) {
				throw new UnprocessableEntityException(pgError, {
					description: 'Database exception',
					cause: error,
				});
			}

			if (error instanceof HttpException) {
				throw error;
			}
			throw new InternalServerErrorException(error.message);
		}
	}

	async update<T extends object>(
		entity: EntityTarget<T>,
		id: number,
		body: Record<string | symbol, any>,
		options: UpdateOptions = {},
	) {
		try {
			const metadata = body[metadataSymbol];
			const entityName = metadata[modelSymbol];
			const row = await this.datasource.manager.findOne(entity, {
				where: { id: id } as any,
			});
			if (!row) {
				throw new NotFoundException('Element not found');
			}

			for (const key in body) {
				let val = body[key];
				const relatedEntityName = metadata[key];
				if (relatedEntityName) {
					val = await this.datasource.manager.save(relatedEntityName, val);
				}
				row[key] = val;
			}
			const created: any = await this.datasource.manager.save(entityName, row);
			return this.datasource.manager.findOne(entity, {
				where: { id: created.id } as any,
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
			if (error instanceof HttpException) {
				throw error;
			}
			throw new InternalServerErrorException(error.message);
		}
	}

	async read<T extends ObjectLiteral>(
		entity: EntityTarget<T>,
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

			if (error instanceof HttpException) {
				throw error;
			}
			throw new InternalServerErrorException(error.message);
		}
	}
}
