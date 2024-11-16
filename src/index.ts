import { async, sync } from 'fast-glob';
import { CreateDtoCreator } from './DtoCreator';
import { parseFiles } from './file-parser';
import { log, time, timeEnd } from 'console';
import { prereq } from './prereq';
import { TreeParser } from './TreeParser';
import { parseTreeV2 } from './tree-parser';
import { CreateSchemaCreator } from './SchemaCreator';

async function main() {
	time('Loading entities');
	const allEntities = await async('**/*/*.entity.ts', { absolute: true });
	timeEnd('Loading entities');

	time('Parsing');
	const ASTs = await parseFiles(allEntities);
	timeEnd('Parsing');

	time('Prerequistes');
	await prereq();
	timeEnd('Prerequistes');
	time('Creating dtos');
	// console.dir(TreeParser.parse(ASTs[Object.keys(ASTs)[0]].sourceFile), { depth: null });

	const addDtoCreator = new CreateSchemaCreator(
		ASTs['category.entity'].sourceFile,
		ASTs['category.entity'].fullPath,
		ASTs,
		{
			maxDepth: 1,
			currDepth: 0,
		}
	);
	// const d = addDtoCreator.parseFields();
	await addDtoCreator.buildFile();

	// const acc = {};
	// parseTreeV2(acc, ASTs[Object.keys(ASTs)[0]].sourceFile);
	// console.dir(acc, { depth: null });
	// console.log(Object.keys(ASTs).length);
	// for (const ast in ASTs) {
	// 	const addDtoCreator = new CreateSchemaCreator(
	// 		ASTs[ast].sourceFile,
	// 		ASTs[ast].fullPath,
	// 		ASTs,
	// 		{
	// 			maxDepth: 1,
	// 			currDepth: 0,
	// 		}
	// 	);
	// 	const d = addDtoCreator.parseFields();
	// 	log(d.exportStatment);
	// }

	timeEnd('Creating dtos');
}

main();

//post has many comments
//posts ? posts => ids => paginated query for comments -> comments back to posts
//complexity count (100 c)
//product -> sales -> (100) ->
//
//opinionated: 2 levels
//
//timeout -> 2s ->
//user -> paginate posts ->
//documentation
//
//user-> posts -> comments -> 2m comment -> paginate comments
//
