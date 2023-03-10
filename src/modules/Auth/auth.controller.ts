import { Controller, Post, Body, UseGuards, ValidationPipe, HttpStatus, Request, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
@ApiTags('Auth')

export class AuthController {
	constructor(private authService: AuthService) { }
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req): Promise<any> {
		// console.log(req.body)
		return this.authService.generateToken(req.body);
	}
}