//@ts-nocheck
export class AbstractService {
	async create(entryClass:  body: AddCategoryEntityDto) {
		const bodyInstance = plainToInstance(AddCategoryEntityDto, body);
		const row = new CategoryEntity();
		for (const key in bodyInstance) {
			let val = bodyInstance[key];
			if (!val) continue;
			const relation = Reflect.getMetadata('relation', bodyInstance, key);
			if (relation) {
				if (relation.type === 'hasOne') {
					const childRel = await this.datasource.manager.save(relation.entity, val);
					val = childRel;
				}
				if (relation.type === 'belongsToOne') {
					const childRel = await this.datasource.manager.save(relation.entity, val);
					val = childRel;
				}
			}
			row[key] = val;
		}
		const r = await this.datasource.manager.save('CategoryEntity', row);
		return r;
	}
}
