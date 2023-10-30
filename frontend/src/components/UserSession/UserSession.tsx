import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import LogIn from './LogIn';
import SignUp from './SignUp';

import { RootState } from 'src/core/store';
import { logout } from 'src/core/store/slices/userData';

const UserSession = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userData);
  const [isLogIn, setIsLogin] = useState(true);

  const cerrarSesion = () => {
    dispatch(logout({}));
    toast('Sesión cerrada');
  };

  return (
    <>
      {!user ? (
        <div className="flex flex-col w-full h-full justify-between items-center py-10">
          {isLogIn ? <LogIn /> : <SignUp changeToLogin={setIsLogin} />}

          <div className="flex justify-between items-center">
            <p>{`${isLogIn ? 'No' : 'Ya'} estás registrado?`}</p>
            <button
              className="text-black underline p-2 hover:text-cyan-500"
              onClick={() => setIsLogin(!isLogIn)}
            >
              {isLogIn ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-between items-center py-10">
          <div className="space-y-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">{`${user.nombre} ${user.apellido}`}</h1>
            <h3 className="text-lg">{user.email}</h3>
            <button
              className="flex items-center text-white bg-red-500 rounded-lg p-2 shadow-md hover:bg-red-600"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSession;
