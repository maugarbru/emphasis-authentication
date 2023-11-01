import { AppDataSource } from '../../config/db.config';

import { Verificador } from '../types';
import { Orden } from '../../entitites/ordenes.entity';

/**
 * Este paso es el que consulta las ordenes en la base de datos, require que en la solicitud
 * haya un usuario autenticado, sino fallará. Dependiendo del rol del usuario, las órdenes son filtradas.
 * Si es un usuario 'normal' solo podrá ver las ordenes asignadas por él, si es 'admin' podrá ver todas.
 */
export const consultarOrdenes: Verificador = {
  nombre: 'consultar-ordenes',
  verificar: async (solicitud) => {
    console.log(`[${consultarOrdenes.nombre}] Consultando órdenes...`);
    const { id, rol } = solicitud.datos.usuario;
    if (!id || !rol) {
      return {
        ...solicitud,
        exito: false,
        error: `[${consultarOrdenes.nombre}] No hay informacion de usuario`,
      };
    }
    const orderRepository = AppDataSource.getRepository(Orden);
    try {
      const ordenes = await orderRepository.find(
        rol === 'normal'
          ? {
              where: {
                idUsuario: id,
              },
            }
          : {},
      );

      if (!ordenes) {
        return {
          ...solicitud,
          exito: false,
          error: `[${consultarOrdenes.nombre}] Error consultando ordenes`,
        };
      }

      console.log(
        '\x1b[32m',
        `[${consultarOrdenes.nombre}] Ordenes consultadas exitosamente para usuario ${rol}`,
        '\x1b[0m',
      );
      return {
        ...solicitud,
        datos: {
          ...solicitud.datos,
          ordenes,
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
