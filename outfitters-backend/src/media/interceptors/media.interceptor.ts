import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	NotAcceptableException,
	Scope,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { I18nTranslations } from '../../generated/i18n.types';
import {
	ObjectCannedACL,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
	S3ClientConfig,
} from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import mimetypes from 'mime-types';
import { UploadedFile } from '../..';
import { ConfigService } from '@nestjs/config';

export type BucketConfigurations = {
	s3Config: S3ClientConfig;
	bucketName: string;
	bucketLinkPrefix: string;
	ACL: ObjectCannedACL;
};

export function MediaInterceptor(
	cb: (configService: ConfigService) => BucketConfigurations,
) {
	@Injectable({
		scope: Scope.DEFAULT,
	})
	class MultipartInterceptor implements NestInterceptor {
		s3Client: S3Client;
		opts: BucketConfigurations;
		constructor(
			public i18n: I18nService<I18nTranslations>,
			public configService: ConfigService,
		) {
			this.opts = cb(configService);
			this.s3Client = new S3Client(this.opts.s3Config);
		}

		intercept(
			context: ExecutionContext,
			next: CallHandler<any>,
		): Observable<any> | Promise<Observable<any>> {
			return new Promise(async (resolve, reject) => {
				try {
					const httpCtx = context.switchToHttp();
					const req = httpCtx.getRequest<FastifyRequest>();
					if (!req.isMultipart()) {
						throw new NotAcceptableException('Request is not of type multipart');
					}
					const promises = [];
					const files = req.files();
					for await (const part of files) {
						const buff = await part.toBuffer();
						const newFilename = `${randomBytes(8).toString('hex')}${new Date().getTime()}.${mimetypes.extension(part.mimetype)}`;
						const params: PutObjectCommandInput = {
							Bucket: this.opts.bucketName,
							Key: newFilename,
							Body: buff,
							ContentType: part.mimetype,
							ACL: this.opts.ACL,
						};

						const command = new PutObjectCommand(params);

						const promise: Promise<UploadedFile> = this.s3Client
							.send(command)
							.then((result) => {
								return {
									s3Response: result,
									url: `${this.opts.bucketLinkPrefix}${newFilename}`,
									newFilename: newFilename,
									original: part,
								};
							});

						promises.push(promise);
					}

					req.uploads = await Promise.all(promises);
					resolve(next.handle());
				} catch (error) {
					console.error(error);
					reject(error);
				}
			});
		}
	}
	return MultipartInterceptor;
}
