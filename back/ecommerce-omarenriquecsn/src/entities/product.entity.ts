import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Category } from './Categories.entity';
import { OrderDetail } from './OrderDetails.entity';

@Entity({
  name: 'products',
})
@Check(`"stock" >= 0`)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  public name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  public description: string;

  @Column('decimal', {
    scale: 2,
    nullable: false,
    precision: 10,
  })
  public price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  public stock: number;

  @Column({
    type: 'text',
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shopify.com%2Fpartners%2Fblog%2Fimg-url-filter&psig=AOvVaw2EkP0J65Il4Nos_inEkDNc&ust=1742612582382000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjajdCXmowDFQAAAAAdAAAAABAE',
  })
  public imgUrl: string;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetail, (ordersDetail) => ordersDetail.product)
  ordersDetail: OrderDetail[];
}
