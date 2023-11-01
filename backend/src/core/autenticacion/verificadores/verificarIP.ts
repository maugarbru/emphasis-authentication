import { Verificador, IPGuardada } from '../types';
import { myCache } from '../../config/db.config';

const nroMaximoFallos = 5;

export const validarIP: Verificador = {
  nombre: 'validar-ip',
  verificar: (solicitud) => {
    const ipRecord = myCache.get(solicitud.credenciales.ip) as IPGuardada;
    const nroDeFallos = Number(ipRecord?.nroFallos) || 0;

    const esIPvalida: boolean = nroDeFallos < nroMaximoFallos;

    return {
      ...solicitud,
      exito: esIPvalida,
      error: esIPvalida
        ? undefined
        : `[${validarIP.nombre}] IP (${solicitud.credenciales.ip}) bloqueada por intentos fallidos`,
    };
  },
};
