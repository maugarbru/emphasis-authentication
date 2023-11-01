import { AppDataSource } from '../../config/db.config';

import { Verificador } from '../types';
import { Orden } from '../../entitites/ordenes.entity';

export const consultarOrdenes: Verificador = {
  nombre: 'consultar-ordenes',
  verificar: async (solicitud) => {
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
