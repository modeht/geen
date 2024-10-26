import { sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { parseFiles } from './file-parser';
import { log } from 'console';

(async () => {
	const allEntities = sync('**/*/*.entity.ts', { absolute: true });

	const ASTs = await parseFiles(allEntities);

	for (const ast in ASTs) {
		const addDtoCreator = new AddDtoCreator(
			ASTs[ast].sourceFile,
			ASTs,
			ASTs[ast].fullPath
		);
		await addDtoCreator.build();
	}
})();
