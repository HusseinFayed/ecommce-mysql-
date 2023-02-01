import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'recipes'})
export class Recipe extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_name: string;

    @Column()
    order_number: number;

    @Column()
    return_number: number;

    @Column()
    total_price: number;

    @Column()
    status: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

} 