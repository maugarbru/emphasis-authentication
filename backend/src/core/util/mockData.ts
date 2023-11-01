import { OrdenType, UsuarioType } from './types';

export const mockedUsuarios: UsuarioType[] = [
  {
    nombre: 'Usuario Normal',
    email: 'normal@test.com',
    password: '1234',
    rol: 'normal',
  },
  {
    nombre: 'Usuario Admin',
    email: 'admin@test.com',
    password: '1234',
    rol: 'admin',
  },
];

export const mockedOrdenes: OrdenType[] = [
  {
    estado: 'creado',
    nroProductos: 2,
  },
  {
    estado: 'entregado',
    nroProductos: 3,
  },
  {
    estado: 'enviado',
    nroProductos: 4,
  },
  {
    estado: 'entregado',
    nroProductos: 2,
  },
  {
    estado: 'creado',
    nroProductos: 2,
  },
  {
    estado: 'entregado',
    nroProductos: 3,
  },
  {
    estado: 'enviado',
    nroProductos: 4,
  },
  {
    estado: 'entregado',
    nroProductos: 2,
  },
];
