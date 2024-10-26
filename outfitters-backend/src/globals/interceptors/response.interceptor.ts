import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => instanceToPlain(data)),
			map((initialData) => {
				if (initialData?.hasOwnProperty('totalCount')) {
					const { totalCount, ...rest } = initialData;
					const values = Object.values(rest);
					let data: any;
					if (values.length > 1) {
						data = rest;
					} else {
						data = values[0];
					}
					return { data, meta: { totalCount } };
				} else if (initialData?.data) {
					const { data, ...rest } = initialData;
					return { data, ...rest };
				}

				return { data: initialData };
			}),
		);
	}
}
