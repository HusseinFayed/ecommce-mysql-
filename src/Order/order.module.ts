import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    // TypeOrmModule.forFeature([Product]),
    // TypeOrmModule.forFeature([Category])
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
