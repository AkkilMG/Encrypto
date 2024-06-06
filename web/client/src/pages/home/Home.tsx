/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React from 'react';

export const Home = () => {
  return (
    <div className="h-full">
        <div className="flex items-center justify-between">
            <div className="container flex flex-col flex-wrap items-center pt-24 mx-auto md:pt-36 md:flex-row">
                <div className="flex flex-col justify-center w-full overflow-y-hidden">
                    <h1 className="my-4 text-3xl font-bold leading-tight text-center text-white opacity-75 md:text-5xl">
                        Welcome To
                        <a href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 hover:text-transparent hover:no-underline">
                        Cyptography Project
                        </a> , Explore Vulnerability & Encryption!
                    </h1>
                    <p className="mb-8 text-base leading-normal text-center md:text-2xl">
                        This is open source project!
                    </p>
                </div>
            </div>
        </div>
        <div className="w-full pt-16 pb-6 text-sm text-center text-gray-400 md:text-left fade-in">
            &copy; <a className="text-blue-300 no-underline hover:text-pink-500 hover:no-underline" href="">Shortener</a> 2021-22 | Made with ❤️ by 
            <a className="text-blue-300 no-underline hover:text-pink-500 hover:no-underline" href="https://github.com/HeimanPictures/">AkKiL</a>
        </div>
    </div>
  );
};