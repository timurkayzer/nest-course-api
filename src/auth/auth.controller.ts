import { BadRequestException, Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ALREADY_REGISTERED } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

	constructor(
		private authService: AuthService
	) {

	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const registeredUser = await this.authService.findUser(dto.login);
		if (registeredUser) {
			throw new BadRequestException(ALREADY_REGISTERED);
		}
		else {
			return this.authService.createUser(dto);
		}

	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const loginUser = await this.authService.loginUser(dto);

		if (loginUser) {
			return { token: loginUser };
		}
		else {
			throw new ForbiddenException();
		}
	}
}
