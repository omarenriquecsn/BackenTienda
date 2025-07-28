import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDetail } from '../entities/OrderDetails.entity';
import { Orders } from '../entities/Orders.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../Users/users.repository';
import { In, MoreThan, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private detailRepository: Repository<OrderDetail>,
  ) {}

  allOrders: Orders[] = [];

  async addOrder(porductsId: CreateOrderDto) {
    const { userId, products } = porductsId;
    const ids = products.map((product) => product.id);
    const user = await this.usersRepository.getUserById(userId);
    if (user) {
      let productsList = await this.productRepository.find({
        where: {
          id: In(ids),
          stock: MoreThan(0),
        },
      });
      console.log(user)

      if (productsList.length === ids.length) {
        productsList = productsList.map((product: Product) => {
          product.stock--;
          return product;
        });
      } else {
        return 'alguno de los porductos no esta disponible';
      }

      const theOrder = await this.orderRepository.save({
        date: new Date(),
        user: user,
      });

      await this.productRepository.save(productsList);

      const price = productsList.reduce(
        (acu, product) => Number(product.price) + acu,
        0,
      );

      const ordenDetail = await this.detailRepository.save({
        price: price,
        order: theOrder,
        products: productsList,
      });

      return `numero de orden ${ordenDetail.id} precio total = ${price}`;
    }
  }

  async findOne(id: string) {
    return this.orderRepository.findBy({ id });
  }

  findAll() {
    return this.orderRepository.find();
  }
}
