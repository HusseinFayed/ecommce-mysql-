import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { CartModule } from './Cart/cart.module';
import { CategoryModule } from './Category/category.module';
import { ProductModule } from './Product/product.module';
import { UserModule } from './User/user.module';
import { OrderModule } from './Order/order.module';

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
