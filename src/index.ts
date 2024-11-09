import { async, sync } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { parseFiles } from './file-parser';
import { time, timeEnd } from 'console';
import { join } from 'path';

async function main() {
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
			ASTs[ast].fullPath,
			ASTs
		);
		await addDtoCreator.build();
	}
	timeEnd('Creating dtos');
}

main();
