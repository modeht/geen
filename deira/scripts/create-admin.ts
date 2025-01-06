import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { DataSource } from 'typeorm';
import { entities } from '../src/db/db.module';
import { hash } from 'bcrypt';
import { RoleEnum, UserEntity } from '../src/users/entities/user.entity';

console.log(process.env);

const datasource = new DataSource({
  type: 'postgres',
  port: +process.env['POSTGRES_PORT'],
  host: process.env['POSTGRES_HOST'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: entities,
  synchronize: false,
  logger: 'simple-console',
  logging: 'all',
});

async function main() {
  const admin = {
    username: 'superadmin',
    email: 'admin@deira.app',
    emailVerified: true,
    password: await hash('Asd@123456', 10),
    role: RoleEnum.SuperAdmin,
  };
  await datasource.initialize();
  await datasource.manager.insert(UserEntity, {
    ...admin,
  });
}

main().then(() => {
  process.exit(0);
});
