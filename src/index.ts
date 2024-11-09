import { async, sync } from 'fast-glob';
import { CreateDtoCreator } from './DtoCreator';
import { parseFiles } from './file-parser';
import { time, timeEnd } from 'console';
import { prereq } from './prereq';

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
	for (const ast in ASTs) {
		const addDtoCreator = new CreateDtoCreator(
			ASTs[ast].sourceFile,
			ASTs[ast].fullPath,
			ASTs,
			{
				maxDepth: 1, //TODO: this already can generate way to much dtos, i am thinking of limiting it to only one level anyways
				currDepth: 0,
			}
		);
		await addDtoCreator.build();
	}
	timeEnd('Creating dtos');
}

main();
