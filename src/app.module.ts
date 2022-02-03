import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsEntity } from './products/product.model';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nikhil',
      password: 'password',
      database: 'test',
      logging: false,
      entities: [ProductsEntity],
      synchronize: true,

    })
    , ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
