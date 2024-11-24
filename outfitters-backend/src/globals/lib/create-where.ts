import {
	Equal,
	ILike,
	IsNull,
	LessThan,
	LessThanOrEqual,
	MoreThan,
	MoreThanOrEqual,
	Not,
} from 'typeorm';
import { AllOperators } from './comparable';

export function createWhere(query: any) {
	const filters = query['filters'];
	const where: Record<string, any> = {};
	if (filters) {
		const iterate = (where: any, filters: any) => {
			for (const key in filters) {
				if (!filters[key]['$val']) {
					where[key] = {};
					iterate(where[key], filters[key]);
				} else {
					const value = filters[key]['$val'];
					const operator = filters[key]['$op'];

					const typeormValue = mapOperators(operator, value);
					where[key] = typeormValue;
				}
			}
		};
		iterate(where, filters);
	}
	return where;
}

export function mapOperators(operator: AllOperators, value: string | number | boolean) {
	switch (operator) {
		case AllOperators.Contains:
			return ILike(`%${value}%`);

		case AllOperators.Eq:
		case AllOperators.Is:
			return Equal(value);

		case AllOperators.NotEq:
		case AllOperators.IsNot:
			return Not(value);

		case AllOperators.IsNull:
			return IsNull();

		case AllOperators.IsNotNull:
			return Not(IsNull());

		case AllOperators.EndsWith:
			return ILike(`%${value}`);

		case AllOperators.StartsWith:
			return ILike(`${value}%`);

		case AllOperators.GreaterThan:
			return MoreThan(value);
		case AllOperators.LessThan:
			return LessThan(value);

		case AllOperators.GreaterThanOrEq:
			return MoreThanOrEqual(value);

		case AllOperators.LessThanOrEq:
			return LessThanOrEqual(value);

		default:
			return undefined;
	}
}
