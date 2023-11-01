export type ApiResponse = {
  success: boolean;
  data: any | null;
  error: Error | string | null;
};

export type UsuarioType = {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'normal';
};

export type OrdenType = {
  id?: string;
  estado: 'creado' | 'procesado' | 'enviado' | 'entregado';
  nroProductos: number;
  idUsuario?: string;
};
