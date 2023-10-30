export type ApiResponse = {
  success: boolean;
  data: any | null;
  error: Error | null;
};

export type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
};
