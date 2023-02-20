import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column()
    user_name: string;

    @Index({ fulltext: true })
    @Column()
    product_id: number;

    @Index({ fulltext: true })
    @Column()
    qty: number;

    @Index({ fulltext: true })
    @Column()
    price: number;

    @Index({ fulltext: true })
    @Column()
    total_price: number;

    @Index({ fulltext: true })
    @Column()
    order_number: number;

    @Index({ fulltext: true })
    @Column()
    recipe_number: number;

    @Index({ fulltext: true })
    @Column()
    seller_name: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;



} 