import { Product } from 'src/models/product.entity';
import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, ManyToMany,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'carts'})
export class Cart extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  total_price: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product)=> product.carts)
  product: Product

  @ManyToOne(() => User, (user)=> user.carts)
  user: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
} 