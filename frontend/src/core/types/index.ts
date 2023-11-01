export type ApiResponse = {
  success: boolean;
  data: any | null;
  error: Error | string | null;
};

export type Usuario = {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'normal';
};

export type Orden = {
  id?: string;
  estado: 'creado' | 'procesado' | 'enviado' | 'entregado';
  nroProductos: number;
  idUsuario?: string;
};

export type Datos = {
  usuario?: Usuario;
  ordenes?: Orden[];
};
