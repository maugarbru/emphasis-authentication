import { Verificador, CredencialesType } from '../types';
import { sanearEmail } from '../../util';

export const sanearDatos: Verificador = {
  nombre: 'sanear-datos',
  verificar: (solicitud) => {
    const emailSaneado = sanearEmail(solicitud.credenciales.email);
    const credencialesSaneadas: CredencialesType = {
      ...solicitud.credenciales,
      email: emailSaneado,
    };

    return {
      ...solicitud,
      credenciales: credencialesSaneadas,
      exito: true,
    };
  },
};
