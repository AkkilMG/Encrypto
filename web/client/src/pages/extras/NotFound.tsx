/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React from 'react';

export const NotFoundPage = () => {
  return (
    <div className="relative flex flex-wrap min-h-screen overflow-hidden">
      <div className="container relative z-10 flex items-center px-6 pt-32 mx-auto md:px-12 xl:py-40">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
            The url you visit is having error.
          </h1>
          <p className="font-extrabold text-white text-8xl mt-44 animate-bounce -inset-0">
            404
            <br />
            <span className="mt-4 text-4xl font-extrabold leading-tight text-center text-white">
              Not Found
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};