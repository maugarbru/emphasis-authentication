import React from 'react';
import { ToastContainer } from 'react-toastify';

type MainLayoutProps = {
  children: React.JSX.Element;
};

const MainLayout = ({ children }: MainLayoutProps): React.JSX.Element => {
  return (
    <div className="w-full h-screen bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500">
      <div className="flex h-full w-full justify-center items-center px-10 py-5 overflow-auto">
        <div className="h-full w-full">{children}</div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
    </div>
  );
};

export default MainLayout;
