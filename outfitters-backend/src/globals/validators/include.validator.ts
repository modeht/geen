import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

export function validate(arr: any[]) {
	@ValidatorConstraint({ name: 'includeValidator', async: false })
	class IncludeValidator implements ValidatorConstraintInterface {
		validate(text: string, args: ValidationArguments) {
			const parts = text.split(',');
			for (const p of parts) {
				if (!arr.includes(p as any)) return false;
			}
			return true;
		}

		defaultMessage(args: ValidationArguments) {
			return `include parameter contains an invalid item accepted values are ${arr.join(', ')}. provided value is ${args.value}`;
		}
	}
	return IncludeValidator;
}
