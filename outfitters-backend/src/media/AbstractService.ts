import { plainToInstance } from 'class-transformer';
import { ClassRef } from './media.service';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class AbstractService {
	constructor(private datasource: DataSource) {}

	async create<T extends { id: number }, K>(
		Entity: ClassRef<T>,
		payloadRef: ClassRef<K>,
		body: K,
	) {
		const bodyInstance = plainToInstance(payloadRef, body);
		const row = new Entity() as any;
		for (const key in bodyInstance) {
			let val = bodyInstance[key] as any;
			if (!val) continue;
			const relation = Reflect.getMetadata('relation', bodyInstance, key);
			if (relation) {
				if (relation.type === 'hasOne' || relation.type === 'belongsToOne') {
					val = await this.datasource.manager.save(relation.entity, val);
				}
			}
			row[key] = val;
		}
		const created = await this.datasource.manager.save(Entity, row);
		return this.datasource.manager.findOne(Entity, { where: { id: created.id } });
	}
}
