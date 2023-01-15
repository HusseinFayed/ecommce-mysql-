import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../Product/category.entity';
import { Product } from '../Product/product.entity';
import { ProductService } from '../Product/product.service';
import { CategoryService } from '../Category/category.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Category])
  ],
    providers: [CartService,ProductService,CategoryService],
    controllers: [CartController]
  })
  export class CartModule {}