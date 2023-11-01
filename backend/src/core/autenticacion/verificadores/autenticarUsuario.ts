import { AppDataSource } from '../../config/db.config';

import { Verificador } from '../types';
import { Usuario } from '../../entitites/usuarios.entity';

/**
 * Este paso es el que consulta realmente las credenciales en la base de datos,
 * si no encuentra usuario que satisfaga esas credenciales, devolverá que fue fallido.
 */
export const autenticarUsuario: Verificador = {
  nombre: 'autenticar-usuario',
  verificar: async (solicitud) => {
    console.log(`[${autenticarUsuario.nombre}] Autenticando usuario...`);
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

      console.log(
        '\x1b[32m',
        `[${autenticarUsuario.nombre}] Autenticacion exitosa, id: ${usuario.id}`,
        '\x1b[0m',
      );
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
