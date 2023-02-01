import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../models/order.entity';
import { UserModule } from '../User/user.module';
import { Cart } from '../../models/cart.entity';
import { Product } from '../../models/product.entity';
import { Recipe } from '../../models/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),UserModule,
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Recipe]),
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
