import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersRepository } from '../Users/users.repository';
import { OrdersRepository } from './orders.repository';
import { UsersModule } from '../Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/Orders.entity';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { OrderDetail } from '../entities/OrderDetails.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, Orders, Product, OrderDetail]),
  ],
  providers: [OrdersService, OrdersRepository, UsersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
