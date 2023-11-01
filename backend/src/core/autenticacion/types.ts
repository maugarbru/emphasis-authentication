import { Usuario } from '../entitites/usuarios.entity';
import { Orden } from '../entitites/ordenes.entity';
import { ApiResponse } from '../util/types';

export type Datos = {
  usuario?: Usuario;
  ordenes?: Orden[];
};

export type CredencialesType = {
  email: string;
  password: string;
  ip: string;
};

export type Solicitud = {
  credenciales: CredencialesType;
  exito: boolean;
  error?: ApiResponse['error'];
  datos?: Datos;
};

export type IPGuardada = {
  ip: string;
  nroFallos: number;
};

export type Verificador = {
  nombre: string;
  verificar: FuncionVerificar;
};

export type FuncionVerificar = (
  solicitud: Solicitud,
) => Solicitud | Promise<Solicitud>;
