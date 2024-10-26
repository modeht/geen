import { Controller, Post, UseInterceptors, Req, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaInterceptor } from './interceptors/media.interceptor';
import { FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { AddMediaEntityDto } from './generated-dtos/add-media-entity.dto';

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post()
	@UseInterceptors(
		MediaInterceptor((configService: ConfigService) => ({
			s3Config: {
				endpoint: configService.getOrThrow('BUCKET_ENDPOINT'),
				region: configService.getOrThrow('BUCKET_REGION'),
				credentials: {
					accessKeyId: configService.getOrThrow('BUCKET_ACCESS_KEY'),
					secretAccessKey: configService.getOrThrow('BUCKET_SECRET_KEY'),
				},
				forcePathStyle: true,
			},
			bucketName: configService.getOrThrow('BUCKET_NAME'),
			bucketLinkPrefix: configService.getOrThrow('BUCKET_PUB_LINK'),
			ACL: 'public-read-write',
		})),
	)
	async upload(@Req() req: FastifyRequest) {
		return this.mediaService.create(req.uploads);
	}

	@Post('test')
	test(@Body() body: AddMediaEntityDto) {
		return this.mediaService.testCreate(body);
	}
}
