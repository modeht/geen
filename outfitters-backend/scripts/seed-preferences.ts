import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { DataSource } from 'typeorm';
import { join } from 'path';

let datasource = new DataSource({
	type: 'postgres',
	port: +process.env['POSTGRES_PORT'],
	host: process.env['POSTGRES_HOST'],
	username: process.env['POSTGRES_USER'],
	password: process.env['POSTGRES_PASSWORD'],
	database: process.env['POSTGRES_DB'],
	entities: [join(process.cwd(), 'dist/**/*.entity.js')],
	logger: 'advanced-console',
	logging: 'all',
});

async function main() {
	datasource = await datasource.initialize();

	const db = datasource.createQueryRunner();
	await db.connect();
	await db.startTransaction();
	const preferences = [
		{
			name: 'Classic',
			media: { id: 1 },
		},
		{
			name: 'Classic',
			media: { id: 2 },
		},
		{
			name: 'Classic',
			media: { id: 3 },
		},
		{
			name: 'Classic',
			media: { id: 4 },
		},
		{
			name: 'Classic',
			media: { id: 5 },
		},
		{
			name: 'Classic',
			media: { id: 6 },
		},
		{
			name: 'Classic',
			media: { id: 7 },
		},
		{
			name: 'Classic',
			media: { id: 8 },
		},
	];
	try {
		await db.manager.insert('PreferenceEntity', preferences);

		await db.commitTransaction();
	} catch (error) {
		console.error(error);
		await db.rollbackTransaction();
	} finally {
		await db.release();
	}
}

main().then(() => {
	process.exit(0);
});
