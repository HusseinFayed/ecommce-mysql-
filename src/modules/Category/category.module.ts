import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../User/user.service';
import { Product } from '../../models/product.entity';
import { Category } from '../../models/category.entity';
import { Cart } from '../../models/cart.entity';
import { User } from '../../models/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
  TypeOrmModule.forFeature([Cart]),
  TypeOrmModule.forFeature([User])
  ],
  providers: [CategoryService, UserService],
  controllers: [CategoryController]
})
export class CategoryModule { }
