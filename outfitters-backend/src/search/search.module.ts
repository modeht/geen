import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
	imports: [UsersModule, ProductsModule],
	controllers: [SearchController],
	providers: [SearchService],
})
export class SearchModule {}
