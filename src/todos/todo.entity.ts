import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  'created_at': Date;

  @UpdateDateColumn()
  'updated_at': Date;
}
