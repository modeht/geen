import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { MultipartFile } from '@fastify/multipart';
import { AuthContext } from './auth/auth.context';
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

declare module 'socket.io' {
  interface Socket {
    session?: SessionToken;
  }
}
