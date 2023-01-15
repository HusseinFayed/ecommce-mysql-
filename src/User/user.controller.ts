import { Body, Controller, Post, Get, Param, HttpCode, UsePipes, ValidationPipe ,Patch,UseGuards, Req} from '@nestjs/common';
import { DepositDto } from './deposit.dto';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auth')
export class UsersController{
    constructor(private readonly userService: UserService) { }
    @Post('/signup')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body()user: UserDto) {
        return await this.userService.createUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Patch('/deposit')
    async deposite(@Req() req, @Body()deposit:DepositDto) {
        const userCheck = await this.userService.getUserByUserName(req.user.name)
        if(!userCheck){
            throw new HttpException('No User By That Name', HttpStatus.UNAUTHORIZED)
          }
        return await this.userService.deposit(req,userCheck,deposit)
    }
    
}