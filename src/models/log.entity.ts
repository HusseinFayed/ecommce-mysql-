import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity({ name: 'logs'})
class Log {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public context: string;
 
  @Column()
  public message: string;
 
  @Column()
  public level: string;
 
  @CreateDateColumn()
  created_at: Date;
}
 
export default Log;