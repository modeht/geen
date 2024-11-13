import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthContext } from 'src/auth/auth.context';
import { CollaborationsService } from 'src/collaborations/collaborations.service';
import { DataSource, FindManyOptions, FindOneOptions } from 'typeorm';
import { AffiliationLinkEntity } from './entities/affiliation-link.entity';

@Injectable()
export class AffiliationLinksService {
	constructor(
		private datasource: DataSource,
		private configService: ConfigService,
		private authContext: AuthContext,
		private collaborationsService: CollaborationsService,
	) {}

	async findOne(opts: FindOneOptions<AffiliationLinkEntity>, throwIfNotFound = true) {
		const row = await this.datasource.manager.findOne(AffiliationLinkEntity, opts);
		if (throwIfNotFound) {
			if (!row) {
				throw new NotFoundException('Record was not found');
			}
		}
		return row;
	}

	async findAll(opts: FindManyOptions<AffiliationLinkEntity>) {
		const [affiliationLinks, totalCount] = await this.datasource.manager.findAndCount(
			AffiliationLinkEntity,
			opts,
		);
		return { affiliationLinks, totalCount };
	}

	async create(productId: number) {
		const shopperId = this.authContext.getUser()!.sub;
		const isProductAffiliated = await this.collaborationsService.isProductAffiliated(
			shopperId,
			productId,
		);

		if (!isProductAffiliated)
			throw new ForbiddenException('User is not affiliated with product');

		const existingAffiliationLink = await this.findOne(
			{ where: { shopperId, productId, isDisabled: false } },
			false,
		);

		if (existingAffiliationLink) {
			return existingAffiliationLink;
		}

		return this.datasource.manager.save(AffiliationLinkEntity, {
			shopperId,
			productId,
			url: this.generateAffiliationUrl(shopperId, productId),
		});
	}

	async isValidAffiliationLink(userId: number, productId: number) {
		const affiliationLink = await this.findOne(
			{ where: { shopperId: userId, productId, isDisabled: false } },
			false,
		);

		return !!affiliationLink;
	}

	// TODO: adjust url for affiliation link
	generateAffiliationUrl(userId: number, productId: number): string {
		const affiliationLinkBaseUrl = this.configService.get('LOCAL_WEB_BASE_URL');
		return `${affiliationLinkBaseUrl}/products/${productId}?affiliation=${userId}`;
	}
}
