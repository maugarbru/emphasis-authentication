import React from 'react';
import classnames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  HiAtSymbol,
  HiExclamationCircle,
  HiKey,
  HiUserAdd,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import { APIbaseURL } from 'src/core/config';

type SignUpProps = {
  changeToLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

type SignUpFields = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
};

const SignUp = ({ changeToLogin }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>();
  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(APIbaseURL + 'usuarios/', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const { data, success, error } = result;
        if (success) {
          changeToLogin(true);
          toast.success(
            `Usuario [${data.nombre} ${data.apellido}] creado correctamente! Inicia sesión ahora`,
          );
        } else {
          toast.error(error.message);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <form
      className="space-y-4 flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold">Registrarse</h1>

      <div
        className={classnames(
          'flex justify-start items-center text-black bg-white border rounded-full p-2 w-full',
          errors.nombre ? 'border-red-500' : 'border-black',
        )}
      >
        <input
          className="grow"
          {...register('nombre', { required: true })}
          placeholder="Nombre"
        ></input>
        {errors.nombre && (
          <HiExclamationCircle className="h-5 w-5 ml-2 text-red-500" />
        )}
      </div>
      <div
        className={classnames(
          'flex justify-start items-center text-black bg-white border rounded-full p-2 w-full',
          errors.apellido ? 'border-red-500' : 'border-black',
        )}
      >
        <input
          className="grow"
          {...register('apellido', { required: true })}
          placeholder="Apellido"
        ></input>
        {errors.apellido && (
          <HiExclamationCircle className="h-5 w-5 ml-2 text-red-500" />
        )}
      </div>

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
        Registrarse
        <HiUserAdd className="h-5 w-5 ml-2" />
      </button>
    </form>
  );
};

export default SignUp;
