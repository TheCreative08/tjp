import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full flex items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src=""
          width={1000}
          height={1000}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full h-full bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center animate-pulse">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
          <Image
          src="/logo.svg"
          width={1000}
          height={1000}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
          </h1>
      
          <p className="text-blue-50 text-base">You are welcome</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
