import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signup')
	async signup(@Body() payload: SignupInput, @Res() res: Response) {
		const credentials = await this.authService.createUser({
			...payload,
			email: payload.email.toLowerCase(),
		});
		res.cookie('refreshToken', credentials.refreshToken, {
			httpOnly: true,
			secure: true,
		});
		return res.send({ accessToken: credentials.accessToken });
	}

	@Post('login')
	@ApiBody({ type: LoginInput })
	async login(@Body() payload: LoginInput, @Res() res: Response) {
		const credentials = await this.authService.login(
			payload.email.toLowerCase(),
			payload.password,
		);
		res.cookie('refreshToken', credentials.refreshToken, {
			httpOnly: true,
			secure: true,
		});
		return res.send({ accessToken: credentials.accessToken });
	}

	@Post('logout')
	async logout(@Res() res: Response) {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
		});
		return res.send({ success: true });
	}

	@Post('refresh-token')
	async refreshToken(@Req() req, @Res() res: Response) {
		const refreshToken = req.cookies['refreshToken'];
		console.log("refreshToken", refreshToken);
		const credentials = await this.authService.refreshToken(refreshToken);
		return res.send({ accessToken: credentials.accessToken });
	}
}
