
import { Cart } from './cart.entity';
import { OBaseEntity } from '../generic/base.entity';
import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, ManyToMany,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'products'})
export class Product extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ar: string;

  @Column()
  name_en: string;

  @Column()
  stock: number;

  @Column()
  price: number;
  
  @Column()
  userName:string;

  @ManyToOne(() => Category, (category)=> category.products)
  category: Category

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
} 