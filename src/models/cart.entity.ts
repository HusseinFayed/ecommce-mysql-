import { Product } from 'src/models/product.entity';
import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, ManyToMany,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Product, (product)=> product.carts)
  product: Product

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
} 