import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryEntity } from './entities/countries.entity';

@Injectable()
export class CountriesService {
	constructor(private readonly dataSource: DataSource) {}

	async findAll(opts: FindManyOptions<CountryEntity>) {
		const [countries, totalCount] = await this.dataSource.manager.findAndCount(
			CountryEntity,
			opts,
		);
		return { countries, totalCount };
	}
	async findOne(opts: FindManyOptions<CountryEntity>, throwIfNotFound = true) {
		const row = await this.dataSource.manager.findOne(CountryEntity, opts);
		if (!row && throwIfNotFound) throw new NotFoundException('Record was not found');
		return row;
	}

	async create(createCountryDto: CreateCountryDto) {
		const exists = await this.dataSource.manager.exists(CountryEntity, {
			where: [
				{ name: createCountryDto.name },
				{ code: createCountryDto.code },
				{ dialCode: createCountryDto.dialCode },
			],
		});
		if (exists) throw new NotFoundException('Country already exists');
		return this.dataSource.manager.save(CountryEntity, createCountryDto);
	}

	async update(id: number, updateCountryDto: UpdateCountryDto) {
		const country = await this.findOne({ where: { id } });
		return this.dataSource.manager.save(CountryEntity, {
			...country,
			...updateCountryDto,
		});
	}

	async remove(id: number) {
		const country = await this.findOne({ where: { id }, relations: { brands: true } });
		if (country.brands.length > 0)
			throw new ConflictException('Country is in use by a brand, cannot delete');
		await this.dataSource.manager.delete(CountryEntity, id);
		return country;
	}
}
