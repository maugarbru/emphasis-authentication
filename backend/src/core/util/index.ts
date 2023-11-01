import { ApiResponse } from './types';

export const errorResponse = (error: ApiResponse['error']): ApiResponse => {
  console.log(error);
  return {
    success: false,
    data: null,
    error,
  };
};

export const successResponse = (data: any): ApiResponse => ({
  success: true,
  data,
  error: null,
});

export const sanearEmail = (email: string): string => {
  const nombreSaneado = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  const dominioSaneado = email
    .split('@')[1]
    .split('.')
    .map((c) => c.replace(/[^a-zA-Z0-9]/g, ''))
    .join('.');

  return `${nombreSaneado}@${dominioSaneado}`;
};
