import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { BrandSignUpDto, SigninDto, SignupDto } from '../dto/auth.dto';

@ApiTags('Web/Auth')
@Controller('web/auth')
export class WebAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body() body: SignupDto) {
		return this.authService.signup(body);
	}

	@Post('signin')
	async sigin(@Body() body: SigninDto) {
		return this.authService.signin(body);
	}

	@Post('brand/signup')
	async brandSignup(@Body() body: BrandSignUpDto) {
		return this.authService.brandSignup(body);
	}
}
