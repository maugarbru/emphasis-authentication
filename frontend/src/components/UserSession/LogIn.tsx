import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  HiAtSymbol,
  HiKey,
  HiExclamationCircle,
  HiArrowCircleRight,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import { APIbaseURL } from 'src/core/config';
import { login } from 'src/core/store/slices/userData';

type LogInFields = {
  email: string;
  password: string;
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFields>({
    defaultValues: {
      email: 'admin@test.com',
      password: '',
    },
  });

  const dispatch = useDispatch();

  const [ip, setIp] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LogInFields> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(APIbaseURL + 'auth/login', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ ...data, ip }),
    })
      .then((response) => response.json())
      .then((result) => {
        const { data, success, error } = result;
        if (success) {
          toast.success(`Bienvenido, [${data.usuario.nombre}] !`);
          dispatch(login(data));
        } else {
          toast.error(error);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    // Obtiene la IP real del equipo
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((res) => {
        setIp(res.ip);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form
      className="space-y-4 flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>

      <div
        className={classnames(
          'flex justify-start items-center text-black bg-white border rounded-full p-2',
          errors.email ? 'border-red-500' : 'border-black',
        )}
      >
        <HiAtSymbol className="h-5 w-5 mr-2" />
        <input
          className="grow"
          {...register('email', { required: true })}
          placeholder="Email"
          type="email"
        ></input>
        {errors.email && (
          <HiExclamationCircle className="h-5 w-5 ml-2 text-red-500" />
        )}
      </div>
      <div
        className={classnames(
          'flex justify-start items-center text-black bg-white border rounded-full p-2',
          errors.password ? 'border-red-500' : 'border-black',
        )}
      >
        <HiKey className="h-5 w-5 mr-2" />
        <input
          className="grow"
          {...register('password', { required: true })}
          placeholder="Password"
          type="password"
        ></input>
        {errors.password && (
          <HiExclamationCircle className="h-5 w-5 ml-2 text-red-500" />
        )}
      </div>
      <button
        className="flex items-center text-white bg-black rounded-lg p-2 shadow-md hover:bg-gray-700"
        type="submit"
      >
        Entrar
        <HiArrowCircleRight className="h-5 w-5 ml-2" />
      </button>
    </form>
  );
};

export default LogIn;
