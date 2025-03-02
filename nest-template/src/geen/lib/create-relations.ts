export type CreateRelationsOptions = {
	depth?: number;
};

export function createRelations(
	query: any,
	opts: CreateRelationsOptions = {
		depth: 0,
	}
) {
	if (!query['relations']) return undefined;
	if (opts.depth < 0) return undefined;

	if (opts.depth === 0) {
		return query['relations'];
	} else if (opts.depth > 0) {
		const allowed: any = {};
		let it = 0;
		const find = (relations: Record<string, boolean | any>, allowed: Record<string, any>) => {
			for (const key in relations) {
				if (it < opts.depth) {
					if (typeof relations[key] === 'boolean') {
						allowed[key] = relations[key];
					} else if (typeof relations[key] === 'object' && Object.keys(relations[key]).length === 0) {
						allowed[key] = true;
					} else if (typeof relations[key] === 'object' && Object.keys(relations[key]).length > 0) {
						it++;
						if (it < opts.depth) {
							allowed[key] = {};
							find(relations[key], allowed[key]);
						} else {
							allowed[key] = true;
						}
					}
				}
			}
		};

		find(query['relations'], allowed);
		return allowed;
	}
}
