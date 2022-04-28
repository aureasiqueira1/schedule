import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Cartao } from './Cartao';

@Entity()
export class Tarefas {

 @PrimaryGeneratedColumn()
 id: number;

 @Column({ type: 'varchar', nullable: true })
 title: string;

 @Column({ type: 'varchar', nullable: false })
 description: string;

 @Column({ type: 'varchar', nullable: false })
 labels: {
  id: any;
  name: string;
 };

 @Column({ type: 'varchar', nullable: false })
 data: any;

 @ManyToOne(() => Cartao, cartao => cartao.tarefas)
 cartao: Cartao;
}