export type RelationDecoratorParams = {
	entity: string;
	type: string;
};

export function Relation(metadata: RelationDecoratorParams) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata('relation', metadata, target, propertyKey);
	};
}
