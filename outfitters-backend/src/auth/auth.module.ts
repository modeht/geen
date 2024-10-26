import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { credential } from 'firebase-admin';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FIREBASE_ADMIN } from './constants';
// import serviceAccount from './outfitters-dev-firebase-adminsdk-w9d7p-5afc266a83.json';
import { AppAuthController } from './platform-app/auth.controller';
import { WebAuthController } from './platform-web/auth.controller';
import { AppleAuthStrategy } from './strategies/apple.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { PhoneAuthStrategy } from './strategies/phone.strategy';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.getOrThrow('JWT_SECRET'),
				};
			},
			inject: [ConfigService],
			global: true,
		}),
	],
	controllers: [WebAuthController, AppAuthController, AuthController],
	providers: [
		{
			provide: FIREBASE_ADMIN,
			useFactory: () => {
				// const app = initializeApp({
				// credential: credential.cert(serviceAccount as ServiceAccount),
				// });
				// return app;
				return {};
			},
		},
		AuthService,
		PhoneAuthStrategy,
		GoogleAuthStrategy,
		AppleAuthStrategy,
	],
	exports: [AuthService],
})
export class AuthModule {}
