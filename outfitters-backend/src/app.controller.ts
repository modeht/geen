import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
	QUERY_PARSER,
	QueryParserService,
} from './globals/services/query-parser.service';
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		// @Inject(QUERY_PARSER) private queryParser: QueryParserService,
	) {}

	@Get('test')
	test(@Query() query: any) {
		console.log(query);
		throw new Error('');
		// this.queryParser.getRelations(query);
		return 'Ok';
	}
}
