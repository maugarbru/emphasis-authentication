import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password?: string;

  @Column('varchar')
  rol: 'admin' | 'normal';
}
