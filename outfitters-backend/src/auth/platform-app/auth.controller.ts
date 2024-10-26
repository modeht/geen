import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { MobileSigninDto, MobileSignupDto } from '../dto/auth.dto';
@ApiTags('App/Auth')
@Controller('app/auth')
export class AppAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body() body: MobileSignupDto) {
		return this.authService.mobileSignup(body);
	}

	@Post('signin')
	async sigin(@Body() body: MobileSigninDto) {
		return this.authService.mobileSignin(body);
	}
}
