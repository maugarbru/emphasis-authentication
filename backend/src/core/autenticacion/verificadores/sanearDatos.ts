import { Verificador, CredencialesType } from '../types';
import { sanearEmail } from '../../util';

/**
 * Como solo estamos validando email y contraseña, el valor que podemos sanear es
 * el email, limpiando caracteres especiales que puedan venir ahi. De todas formas, el frontend
 * ya hace ciertas validaciones en los campos.
 */
export const sanearDatos: Verificador = {
  nombre: 'sanear-datos',
  verificar: (solicitud) => {
    console.log(`[${sanearDatos.nombre}] Saneando datos...`);
    const emailSaneado = sanearEmail(solicitud.credenciales.email);
    const credencialesSaneadas: CredencialesType = {
      ...solicitud.credenciales,
      email: emailSaneado,
    };

    console.log(
      '\x1b[32m',
      `[${sanearDatos.nombre}] Email saneado de caracteres especiales: ${emailSaneado}`,
      '\x1b[0m',
    );
    return {
      ...solicitud,
      credenciales: credencialesSaneadas,
      exito: true,
    };
  },
};
