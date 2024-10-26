import { sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { DepthManager } from './DepthManager';
import { parseFiles } from './file-parser';
import { log } from 'console';

(async () => {
	const allEntities = sync('**/*/*.entity.ts', { absolute: true });
	// log(allEntities);
	const ASTs = await parseFiles(allEntities);
	// log(ASTs['user.entity']);
	for (const ast in ASTs) {
		const addDtoCreator = new AddDtoCreator(
			ASTs[ast].sourceFile,
			ASTs,
			ASTs[ast].fullPath
		);
		await addDtoCreator.build();
		DepthManager.currDepth = 0;
	}
})();
