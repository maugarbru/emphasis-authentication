import { Verificador, IPGuardada } from '../types';
import { myCache } from '../../config/db.config';

const nroMaximoFallos = 5;

/**
 * Verifica el registro de la IP del cliente en cache y compara el numero de fallos
 * anteriores. Si éste supera el numero maximo definido arriba, rechazará las siguientes
 * solicitudes de la misma IP
 */
export const validarIP: Verificador = {
  nombre: 'validar-ip',
  verificar: (solicitud) => {
    console.log(`[${validarIP.nombre}] Validando IP...`);
    const ipRecord = myCache.get(solicitud.credenciales.ip) as IPGuardada;
    const nroDeFallos = Number(ipRecord?.nroFallos) || 0;

    const esIPvalida: boolean = nroDeFallos < nroMaximoFallos;

    if (esIPvalida) {
      console.log(
        '\x1b[32m',
        `[${validarIP.nombre}] IP válida: ${solicitud.credenciales.ip}`,
        '\x1b[0m',
      );
    }
    return {
      ...solicitud,
      exito: esIPvalida,
      error: esIPvalida
        ? undefined
        : `[${validarIP.nombre}] IP (${solicitud.credenciales.ip}) bloqueada por intentos fallidos`,
    };
  },
};
