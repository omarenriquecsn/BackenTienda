import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from './Orders.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public password: string;

  @Column({ type: 'int' })
  public phone: number;

  @Column({ type: 'text' })
  public address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: undefined,
  })
  public country?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: undefined,
  })
  public city?: string;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Orders[];
}
