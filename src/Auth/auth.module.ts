import { Module } from '@nestjs/common';
import { UserModule } from 'src/User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/User/user.entity';


@Module({ 
	imports: [TypeOrmModule.forFeature([User]),UserModule, PassportModule, JwtModule.register({
	secret: 'secret123',
	signOptions: { expiresIn: '1y'},
	})],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	})
export class AuthModule {}