import { Injectable, NotAcceptableException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async validateUserCreds(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(username);
        
        if (!user) throw new BadRequestException();

        const passworMatch = await bcrypt.compare(password, user.password);
        if (!passworMatch) {
            // Invalid credentials
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        // return the user
        return user;
    }

    async generateToken(user: any) {
        const payload = { username: user.username };
        const token = this.jwtService.sign({
            name: user.username,
        })
        // console.log(user.username)
        await this.userRepository.update({ username: user.username }, { user_token: token })
        return token
    }
}