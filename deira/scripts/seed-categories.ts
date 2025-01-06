import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { DataSource } from 'typeorm';
import { entities } from '../src/db/db.module';
import { CategoryEntity } from '../src/categories/entities/category.entity';
import { CreateCategoryFilterDto } from '../src/category-fitlers/dto/category-filter.dto';
import { CategoryFilterEntity } from '../src/category-fitlers/entities/category-filters.entity';
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
});

async function main() {
  await datasource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  const db = datasource.createQueryRunner();
  await db.connect();
  await db.startTransaction();
  try {
    const categories = {
      المناسبات: [],
      الوظائف: [],
      سيارات: [{ الماركة: [] }, { النوع: [] }, { 'سنة الصنع': [] }],
      عقارات: [],
      إلكترونيات: [],
      'لوازم شخصية': [],
      'لوازم منزلية': [],
      خدمات: [],
      'حراج المستعمل': [],
      مأكولات: [],
      حيوانات: [],
      مقاولات: [],
    };
    for (const key in categories) {
      const created = await db.manager.insert(CategoryEntity, {
        name: key,
        visible: true,
      });
      if (categories[key].length) {
        const filters = categories[key].map((i) => Object.keys(i)[0]);
        for (const filter of filters) {
          await db.manager.insert(CategoryFilterEntity, {
            name: filter,
            category: {
              id: created.identifiers[0].id,
            },
          });
        }
      }
    }

    await db.commitTransaction();
  } catch (error) {
    await db.rollbackTransaction();
  } finally {
    await db.release();
  }
}

main().then(() => {
  process.exit(0);
});
