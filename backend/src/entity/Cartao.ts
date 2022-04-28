import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm'
import { Tarefas } from './Tarefas';


@Entity()
export class Cartao {

 @PrimaryGeneratedColumn()
 id: number;

 @Column({ type: 'varchar', nullable: true })
 title: string;

 /*@OneToMany(() => Tarefas, (post2: Tarefas) => post2.id)
 posts2: Tarefas[];*/

 @OneToMany(() => Tarefas, tarefas => tarefas.cartao, {
  cascade: true
 })
 tarefas: Tarefas[];

 addTarefa(tarefa: Tarefas) {
  if (this.tarefas == null) {
   this.tarefas = new Array<Tarefas>()
  }
  this.tarefas.push(tarefa);
 }
}