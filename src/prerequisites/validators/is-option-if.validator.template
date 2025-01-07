import { ValidateIf, type ValidationOptions } from 'class-validator';

/** Same as `@Optional()` decorator of class-validator, but adds a conditional layer on top of it */
export const IsOptionalIf: IsOptionalIf =
	(condition, options = {}) =>
	(target: object, propertyKey: string | symbol) => {
		const { allowNull = true, allowUndefined = true, ...validationOptions } = options;
		ValidateIf((object: any, value: any): boolean => {
			// if condition was true, just disable the validation on the null & undefined fields
			const isOptional = Boolean(condition(object, value));
			const isNull = object[propertyKey] === null;
			const isUndefined = object[propertyKey] === undefined;
			let isDefined = !(isNull || isUndefined);
			if (!allowNull && allowUndefined) isDefined = !isUndefined;
			if (!allowUndefined && allowNull) isDefined = !isNull;

			const isRequired = isOptional && !isDefined ? false : true;
			return isRequired;
		}, validationOptions)(target, propertyKey);
	};

export interface OptionalIfOptions {
	allowNull?: boolean;
	allowUndefined?: boolean;
}

export type IsOptionalIf = <
	T extends Record<string, any> = any, // class instance
	Y extends keyof T = any, // propertyName
>(
	condition: (object: T, value: T[Y]) => boolean | void,
	validationOptions?: ValidationOptions & OptionalIfOptions,
) => PropertyDecorator;
