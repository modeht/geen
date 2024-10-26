import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
	ChangePasswordDto,
	ForgotPasswordDto,
	ResetPasswordDto,
	ValidateAuthDto,
} from './dto/auth.dto';
import { AuthGuard } from './guards/auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('forgot-password')
	async forgotPassword(@Body() body: ForgotPasswordDto) {
		return this.authService.forgotPassword(body);
	}

	@Post('reset-password')
	async resetPassword(@Body() body: ResetPasswordDto) {
		return this.authService.resetPassword(body);
	}

	@Post('change-password')
	@UseGuards(AuthGuard)
	async changePassword(@Body() body: ChangePasswordDto) {
		return this.authService.changePassword(body);
	}

	@Get('validate')
	async validate(@Query() query: ValidateAuthDto) {
		return this.authService.validatePhoneOrEmailOrUsername(query);
	}
}
