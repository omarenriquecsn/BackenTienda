import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.addOrder(createOrderDto);
  }

  findAll() {
    return this.ordersRepository.findAll();
  }

  findOne(id: string) {
    return this.ordersRepository.findOne(id);
  }
}
