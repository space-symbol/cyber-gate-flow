import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-8 text-foreground">
        <div className="max-w-lg">
          <div className="flex items-center space-x-3 mb-8">
            <img src='/logo.png' className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-primary">
              VibibayVPN
            </h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Управляйте своими VPN устройствами с легкостью
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Безопасное подключение, простое управление и полный контроль над вашими устройствами в одной платформе.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
