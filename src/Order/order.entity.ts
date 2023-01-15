import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'orders'})
export class Order extends BaseEntity {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    product_id: string;

    @Column()
    qty: number;

    @Column()
    price: number;

    @Column()
    total_price: number;

    @Column()
    order_number: number;

    @Column()
    recipe_number: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;



} 