import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tasks {

 @PrimaryGeneratedColumn()
 id: number;

 @Column({ type: 'varchar', nullable: true })
 name: string;

 @Column({ type: 'varchar', nullable: true })
 completed: string;

}