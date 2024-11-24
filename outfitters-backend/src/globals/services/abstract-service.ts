import { DataSource } from 'typeorm';
import {
	Injectable,
	InternalServerErrorException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { metadataSymbol, modelSymbol } from '../constants/schema-symbols';
import { PostgresErrorCode } from '../constants/pg-error-codes';

export type CreateOptions = {
	//
};

@Injectable()
export class AbstractService {
	constructor(private datasource: DataSource) {}

	async create(body: Record<string | symbol, any>, {}: CreateOptions = {}) {
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
}
