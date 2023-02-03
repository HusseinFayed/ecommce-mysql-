import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../models/order.entity';
import { Cart } from '../../models/cart.entity';
import { Product } from '../../models/product.entity';
import { Recipe } from '../../models/recipe.entity';
import { User } from '../../models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Recipe]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
