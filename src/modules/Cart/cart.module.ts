import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../models/category.entity';
import { Product } from '../../models/product.entity';
import { ProductService } from '../Product/product.service';
import { CategoryService } from '../Category/category.service';
import { CartController } from './cart.controller';
import { Cart } from '../../models/cart.entity';
import { CartService } from './cart.service';
import { UserService } from '../User/user.service';
import { User } from '../../models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]),
  TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
  TypeOrmModule.forFeature([User]),
  ],
  providers: [CartService, ProductService, CategoryService,UserService],
  controllers: [CartController]
})
export class CartModule { }