import { async, sync } from 'fast-glob';
import { CreateDtoCreator } from './DtoCreator';
import { parseFiles } from './file-parser';
import { log, time, timeEnd } from 'console';
import { prereq } from './prereq';
import { TreeParser } from './TreeParser';
import { parseTreeV2 } from './tree-parser';
import { CreateSchemaCreator } from './CreateSchemaCreator';
import { ReadSchemaFiltersCreator } from './ReadSchemaFiltersCreator';
import { ReadSchemaRelationsCreator } from './ReadSchemaRelationsCreator';
import { ReadSchemaCreator } from './ReadSchemaCreator';

async function main() {
	time('Loading entities');
	const allEntities = await async('**/*/*.entity.ts', { absolute: true, ignore: ['**/*/node_modules'] });
	timeEnd('Loading entities');

	time('Parsing');
	const ASTs = await parseFiles(allEntities);
	timeEnd('Parsing');

	time('Prerequistes');
	await prereq();
	timeEnd('Prerequistes');

	time('Creating dtos');
	// console.dir(TreeParser.parse(ASTs[Object.keys(ASTs)[0]].sourceFile), { depth: null });

	// const addDtoCreator = new ReadSchemaCreator(
	// 	ASTs['category.entity'].sourceFile,
	// 	ASTs['category.entity'].fullPath,
	// 	ASTs,
	// 	{
	// 		maxDepth: 1,
	// 		currDepth: 0,
	// 	}
	// );
	// addDtoCreator.baseSetup();
	// await addDtoCreator.buildFile();

	// const acc = {};
	// parseTreeV2(acc, ASTs[Object.keys(ASTs)[0]].sourceFile);
	// console.dir(acc, { depth: null });
	// console.log(Object.keys(ASTs).length);
	for (const ast in ASTs) {
		const c = new CreateSchemaCreator(ASTs[ast].sourceFile, ASTs[ast].fullPath, ASTs);
		const f = new ReadSchemaCreator(ASTs[ast].sourceFile, ASTs[ast].fullPath, ASTs);
		f.baseSetup();

		await f.build();
		await c.buildFile();
	}

	timeEnd('Creating dtos');
}

main();
