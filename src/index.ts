import { sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { DepthManager } from './DepthManager';
import { parseFiles } from './file-parser';
import { log } from 'console';

(async () => {
	const allEntities = sync('**/*/*.entity.ts', { absolute: true });
	// log(allEntities);

	const ASTs = await parseFiles(allEntities);
	log(Object.keys(ASTs).length);

	const testAst = Object.values(ASTs)[0];
	// log(testAst);
	const addDtoCreator = new AddDtoCreator(testAst.sourceFile, ASTs, testAst.fullPath, {
		maxDepth: 1,
	});
	await addDtoCreator.build();

	// reset depth
	DepthManager.currDepth = 0;
})();
