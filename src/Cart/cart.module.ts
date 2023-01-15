import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/Product/category.entity';
import { Product } from 'src/Product/product.entity';
import { ProductService } from 'src/Product/product.service';
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