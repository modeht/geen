import { sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { DepthManager } from './DepthManager';
import { parseFiles } from './file-parser';

(async () => {
	const allEntities = sync('**/*/*.entity.ts', { absolute: true });

	const ASTs = await parseFiles(allEntities);

	const testAst = Object.values(ASTs)[0];
	const addDtoCreator = new AddDtoCreator(testAst.sourceFile, ASTs, testAst.fullPath, {
		maxDepth: 1,
	});
	await addDtoCreator.build();

	//reset depth
	DepthManager.currDepth = 0;
})();
