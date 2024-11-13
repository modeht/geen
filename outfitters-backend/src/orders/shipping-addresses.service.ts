import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { ShippingAddressEntity } from '../users/entities/shipping-address.entity';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { Paginated } from 'src/globals/dto/paginated.dto';

@Injectable()
export class ShippingAddressesService {
	constructor(
		private readonly datasource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async create(createShippingAddressDto: CreateShippingAddressDto) {
		const userId = this.authContext.getUser()!.sub;
		const shippingAddress = new ShippingAddressEntity();
		shippingAddress.shopperId = userId;
		shippingAddress.latitude = createShippingAddressDto.latitude;
		shippingAddress.longitude = createShippingAddressDto.longitude;
		shippingAddress.country = createShippingAddressDto.country;
		shippingAddress.city = createShippingAddressDto.city;
		shippingAddress.street = createShippingAddressDto.street;
		shippingAddress.building = createShippingAddressDto.building;
		shippingAddress.apartment = createShippingAddressDto.apartment;
		shippingAddress.name = createShippingAddressDto.name;
		shippingAddress.floor = createShippingAddressDto.floor;
		shippingAddress.address = createShippingAddressDto.address;
		return this.datasource.manager.save(shippingAddress);
	}

	async findAll(paginated: Paginated) {
		const userId = this.authContext.getUser()!.sub;
		const [shippingAddresses, totalCount] = await this.datasource.manager.findAndCount(
			ShippingAddressEntity,
			{
				where: { shopperId: userId, isDefault: false },
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
			},
		);
		return { shippingAddresses, totalCount };
	}

	async findOne(opts: FindOptionsWhere<ShippingAddressEntity>) {
		const row = await this.datasource.manager.findOneBy(ShippingAddressEntity, opts);
		if (!row) throw new NotFoundException('Shipping address not found');
		return row;
	}

	async update(id: number, updateShippingAddressDto: UpdateShippingAddressDto) {
		const userId = this.authContext.getUser()!.sub;
		const shippingAddress = await this.findOne({ id, shopperId: userId });

		shippingAddress.latitude =
			updateShippingAddressDto.latitude ?? shippingAddress.latitude;
		shippingAddress.longitude =
			updateShippingAddressDto.longitude ?? shippingAddress.longitude;
		shippingAddress.country = updateShippingAddressDto.country ?? shippingAddress.country;
		shippingAddress.city = updateShippingAddressDto.city ?? shippingAddress.city;
		shippingAddress.street = updateShippingAddressDto.street ?? shippingAddress.street;
		shippingAddress.building =
			updateShippingAddressDto.building ?? shippingAddress.building;
		shippingAddress.apartment =
			updateShippingAddressDto.apartment ?? shippingAddress.apartment;
		shippingAddress.name = updateShippingAddressDto.name ?? shippingAddress.name;
		shippingAddress.floor = updateShippingAddressDto.floor ?? shippingAddress.floor;
		shippingAddress.address = updateShippingAddressDto.address ?? shippingAddress.address;

		return this.datasource.manager.save(shippingAddress);
	}

	async remove(id: number) {
		const userId = this.authContext.getUser()!.sub;
		const shippingAddress = await this.findOne({ id, shopperId: userId });
		await this.datasource.manager.softRemove(shippingAddress);
		return shippingAddress;
	}
}
