import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { CartModule } from './modules/Cart/cart.module';
import { CategoryModule } from './modules/Category/category.module';
import { OrderModule } from './modules/Order/order.module';
import { ProductModule } from './modules/Product/product.module';
import { UserModule } from './modules/User/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'api',
      autoLoadEntities: true,
      // synchronize: true,
      //dropSchema: true
    }), ProductModule, UserModule, AuthModule, CartModule, CategoryModule, OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
