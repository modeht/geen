import { FindOptionsRelations } from 'typeorm';

export const QUERY_PARSER = 'QUERY_PARSER';

export class QueryParserService {
	constructor() {}

	recursivelyAddField(obj = {}, parts = []) {
		if (!parts.length) {
			return obj;
		}
		if (parts.length > 1) {
			obj[parts[0]] = {};
		} else {
			obj[parts[0]] = true;
		}
		return this.recursivelyAddField(obj[parts[0]], parts.slice(1));
	}

	getRelations<T>(query: Record<string, any>) {
		const relations: FindOptionsRelations<T> = {};
		for (const key in query) {
			if (key.startsWith('relations')) {
				const relation = key.slice('relations'.length + 1, key.length - 1);
				const levels = relation.split('.');
				this.recursivelyAddField(relations, levels);
			}
		}
		return relations;
	}
}
