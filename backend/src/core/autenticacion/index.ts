import { Verificador, CredencialesType, Solicitud, IPGuardada } from './types';
import { myCache } from '../config/db.config';

import { sanearDatos } from './verificadores/sanearDatos';
import { validarIP } from './verificadores/verificarIP';
import { autenticarUsuario } from './verificadores/autenticarUsuario';
import { consultarOrdenes } from './verificadores/consultarOrdenes';

export const manejadorAutenticacion = async (
  credenciales: CredencialesType,
): Promise<Solicitud> => {
  // Lista de verificadores EN ORDEN para ser ejecutados
  const listaVerificadoresEnOrden: Verificador[] = [
    validarIP,
    sanearDatos,
    autenticarUsuario,
    consultarOrdenes,
  ];

  // Objeto resultado que va guardando el resultado de cada verificador para pasarselo al siguiente
  // El primer estado es las credenciales que vienen del endpoint y exito true para que continue
  let resultado: Solicitud = {
    credenciales,
    exito: true,
  };

  // Ciclo que llama cada verificador, valida el exito del paso anterior para romper el ciclo o seguir
  for (const verificador of listaVerificadoresEnOrden) {
    if (resultado.exito) {
      resultado = await verificador.verificar(resultado);
    } else {
      break;
    }
  }

  // Se comprueba en cache que la IP haya sido registrada anteriormente
  // Se le va sumando intentos fallidos o se reinicia en 0 si el resultado final es exitoso o no
  const ipRecord = myCache.get(resultado.credenciales.ip) as IPGuardada;
  myCache.set(resultado.credenciales.ip, {
    nroFallos: !resultado.exito
      ? ipRecord
        ? Number(ipRecord.nroFallos + 1)
        : 1
      : 0,
  });

  return resultado;
};
