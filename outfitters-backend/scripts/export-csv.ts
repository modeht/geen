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
	synchronize: true,
	logger: 'advanced-console',
	logging: 'all',
});

async function main() {
	try {
		datasource = await datasource.initialize();
		// console.log(datasource.entityMetadatas);
		console.log('Synced');
	} catch (error) {
		console.error(error);
	} finally {
	}
}

main().then(() => {
	process.exit(0);
});
