import { async, sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { parseFiles } from './file-parser';
import { log, time, timeEnd } from 'console';

export const appModulePath = sync('**/*/app.module.ts', { absolute: true })[0];

(async () => {
	time('Loading entities');
	const allEntities = await async('**/*/*.entity.ts', { absolute: true });
	timeEnd('Loading entities');

	time('Parsing');
	const ASTs = await parseFiles(allEntities);
	timeEnd('Parsing');

	time('Creating dtos');
	for (const ast in ASTs) {
		const addDtoCreator = new AddDtoCreator(
			ASTs[ast].sourceFile,
			ASTs,
			ASTs[ast].fullPath
		);
		await addDtoCreator.build();
	}
	timeEnd('Creating dtos');
})();
