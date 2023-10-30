import { ApiResponse } from './types';

export const errorResponse = (error: Error): ApiResponse => {
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
