import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import LogIn from './LogIn';

import { RootState } from 'src/core/store';
import { logout } from 'src/core/store/slices/userData';

const UserSession = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.userData);

  const cerrarSesion = () => {
    dispatch(logout({}));
    toast('Sesión cerrada');
  };

  return (
    <>
      {!data ? (
        <div className="flex flex-col w-full h-full justify-between items-center py-10">
          <LogIn />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="space-y-4 flex flex-col justify-center items-center backdrop-blur-md bg-white/30 p-5 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold">{`${data.usuario.nombre}`}</h1>
            <h3 className="text-lg">{data.usuario.email}</h3>
            <h4 className="text-base font-bold uppercase">
              [{data.usuario.rol}]
            </h4>
            <button
              className="flex items-center text-white bg-red-500 rounded-lg p-2 shadow-md hover:bg-red-600"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
          <div className="mt-4 flex flex-col justify-center items-center backdrop-blur-md bg-white/30 p-5 rounded-lg shadow-2xl">
            <div className="w-full grow overflow-y-auto">
              <table className="table-fixed w-full">
                <thead className="bg-cyan-100">
                  <tr>
                    <th>ID Orden</th>
                    <th>Estado</th>
                    <th># Productos</th>
                    <th>ID Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.ordenes?.map((item) => (
                    <tr key={item.id} className="bg-cyan-100/50">
                      <td className="text-xs text-left pl-5">{item.id}</td>
                      <td className="text-center uppercase">{item.estado}</td>
                      <td className="text-center">{item.nroProductos}</td>
                      <td className="text-xs text-left pr-5">
                        {item.idUsuario}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSession;
