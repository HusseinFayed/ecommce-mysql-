import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/Cart/cart.entity';
import { CategoryService } from '../Category/category.service';
import { User } from '../User/user.entity';
import { UserService } from '../User/user.service';
import { Category } from './category.entity';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
  TypeOrmModule.forFeature([Cart]),
  TypeOrmModule.forFeature([User])
],
  
  providers: [ProductService,CategoryService,UserService],
  controllers: [ProductController]
})
export class ProductModule {}
