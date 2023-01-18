import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../models/order.entity';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),UserModule
    // TypeOrmModule.forFeature([Product]),
    // TypeOrmModule.forFeature([Category])
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
