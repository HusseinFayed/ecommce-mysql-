import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        // TypeOrmModule.forFeature([Category])
    ],
    providers: [UserService],
    controllers: [UsersController],
    exports: [UserService]
})
export class UserModule { }