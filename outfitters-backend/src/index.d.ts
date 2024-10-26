import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { MultipartFile } from '@fastify/multipart';
import { SessionToken } from './auth/types';

export type UploadedFile = {
	url: string;
	s3Response: PutObjectCommandOutput;
	newFilename: string;
	original: MultipartFile;
};

declare module 'fastify' {
	interface FastifyRequest {
		session?: SessionToken;
		uploads: UploadedFile[];
	}
}
