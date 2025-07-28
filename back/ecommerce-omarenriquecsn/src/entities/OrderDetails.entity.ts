import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';
import { Orders } from './Orders.entity';

@Entity({ name: 'orders-detail' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @OneToOne(() => Orders)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Product, (product) => product.ordersDetail)
  product: Product[];
}
