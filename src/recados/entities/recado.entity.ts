import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  // @Column({ type: 'varchar', length: 50 })
  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // @Column({ type: 'varchar', length: 50 })
  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'para' })
  para: Pessoa;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
