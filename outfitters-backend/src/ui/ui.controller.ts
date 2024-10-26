import { Controller, Get, Render } from '@nestjs/common';

@Controller({
	path: 'ui',
	version: '',
})
export class UiController {
	constructor() {}

	@Get()
	@Render('index')
	index() {
		return {};
	}
}
