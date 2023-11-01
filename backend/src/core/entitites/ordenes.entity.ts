import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  estado: 'creado' | 'procesado' | 'enviado' | 'entregado';

  @Column('int')
  nroProductos: number;

  @Column('varchar')
  idUsuario: string;
}
