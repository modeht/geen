import { BadRequestException } from '@nestjs/common';
import { Transform, TransformOptions } from 'class-transformer';

export const IsOptionalBoolean = (options?: TransformOptions) =>
	Transform(({ value, key }) => {
		switch (value) {
			case 'true':
			case true:
				return true;
			case 'false':
			case false:
				return false;
			case undefined:
				return undefined;
			default:
				throw new BadRequestException(`${key} must be a boolean value`);
		}
	}, options);
