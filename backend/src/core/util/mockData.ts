import { CreateUsuarioDto } from 'src/modules/usuarios/dto';

export const mockedUsers: CreateUsuarioDto[] = [
  {
    nombre: 'Usuario',
    apellido: 'Test',
    email: 'usuario@test.com',
    password: '1234',
  },
];
