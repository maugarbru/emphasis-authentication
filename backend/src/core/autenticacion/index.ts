import { Verificador, CredencialesType, Solicitud, IPGuardada } from './types';
import { myCache } from '../config/db.config';

import { sanearDatos } from './verificadores/sanearDatos';
import { validarIP } from './verificadores/verificarIP';
import { autenticarUsuario } from './verificadores/autenticarUsuario';
import { consultarOrdenes } from './verificadores/consultarOrdenes';

export const manejadorAutenticacion = async (
  credenciales: CredencialesType,
): Promise<Solicitud> => {
  const listaVerificadoresEnOrden: Verificador[] = [
    validarIP,
    sanearDatos,
    autenticarUsuario,
    consultarOrdenes,
  ];

  let resultado: Solicitud = {
    credenciales,
    exito: true,
  };
  for (const verificador of listaVerificadoresEnOrden) {
    if (resultado.exito) {
      resultado = await verificador.verificar(resultado);
    } else {
      break;
    }
  }

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
