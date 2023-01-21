import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import LogsMiddleware from './logger/logs.middleware';
import { CartModule } from './modules/Cart/cart.module';
import { CategoryModule } from './modules/Category/category.module';
import { OrderModule } from './modules/Order/order.module';
import { ProductModule } from './modules/Product/product.module';
import { UserModule } from './modules/User/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABSE_HOST,
      // port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABSE_PASSWORD,
      database: process.env.DATBASE_NAME,
      autoLoadEntities: true,
      // synchronize: true,
      //dropSchema: true
    }), ProductModule, UserModule, AuthModule, CartModule, CategoryModule, OrderModule, LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
