import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../models/cart.entity';
import { Category } from '../../models/category.entity';
import { Product } from '../../models/product.entity';
import { User } from '../../models/user.entity';
import { CategoryService } from '../Category/category.service';
import { UserService } from '../User/user.service'
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
  TypeOrmModule.forFeature([Cart]),
  TypeOrmModule.forFeature([User])
  ],

  providers: [ProductService, CategoryService, UserService],
  controllers: [ProductController]
})
export class ProductModule { }
