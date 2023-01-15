import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Product/product.entity';
import { Category } from '../Product/category.entity';
import { Cart } from '../Cart/cart.entity';
import { UserService } from '../User/user.service';
import { User } from '../User/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
  TypeOrmModule.forFeature([Cart]),
  TypeOrmModule.forFeature([User])
],
  providers: [CategoryService,UserService],
  controllers: [CategoryController]
})
export class CategoryModule {}
