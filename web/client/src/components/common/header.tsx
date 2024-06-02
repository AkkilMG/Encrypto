/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React, { useState } from 'react';

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full text-gray-100 transition-all duration-300 ease-in-out body-font">
      <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
        <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='Cryptography Project' /></a>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <a href="/" className="mr-6 cursor-pointer hover:text-orange-600 ">Home</a>
          <a href="/signin" className="mr-6 cursor-pointer hover:text-orange-600">Signin</a>
          <a href="/signup" className="mr-6 cursor-pointer hover:text-orange-600">Signup</a>
        </nav>
      </div>
    </header>
  );
};