
import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, ManyToMany,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Category } from './category.entity';

@Entity({ name: 'users'})
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  role: string;

  @Column({ default: 0 })
  deposit: number;

  @Column({ default: 0 })
  user_token: string;

  @Column()
  change_password_token: number;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

} 