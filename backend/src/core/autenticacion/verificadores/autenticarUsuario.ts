import { AppDataSource } from '../../config/db.config';

import { Verificador } from '../types';
import { Usuario } from '../../entitites/usuarios.entity';

export const autenticarUsuario: Verificador = {
  nombre: 'autenticar-usuario',
  verificar: async (solicitud) => {
    const userRepository = AppDataSource.getRepository(Usuario);
    try {
      const usuario = await userRepository.findOne({
        where: {
          email: solicitud.credenciales.email,
          password: solicitud.credenciales.password,
        },
      });

      if (!usuario) {
        return {
          ...solicitud,
          exito: false,
          error: `[${autenticarUsuario.nombre}] No existe usuario para esas credenciales`,
        };
      }

      return {
        ...solicitud,
        datos: {
          ...solicitud.datos,
          usuario,
        },
        exito: true,
      };
    } catch (error) {
      return {
        ...solicitud,
        exito: false,
        error,
      };
    }
  },
};
