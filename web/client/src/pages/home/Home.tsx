/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import React from 'react';

export const Home = () => {
  return (
    // <div className="h-full">
    //     <div className="flex items-center justify-between">
    //         <div className="container flex flex-col flex-wrap items-center pt-24 mx-auto md:pt-36 md:flex-row">
    //             <div className="flex flex-col justify-center w-full overflow-y-hidden">
    //                 <h1 className="my-4 text-3xl font-bold leading-tight text-center text-white opacity-75 md:text-5xl">
    //                     Welcome To
    //                     <a href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 hover:text-transparent hover:no-underline">
    //                     Cyptography Project
    //                     </a> , Explore Vulnerability & Encryption!
    //                 </h1>
    //                 <p className="mb-8 text-base leading-normal text-center md:text-2xl">
    //                     This is open source project!
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="w-full pt-16 pb-6 text-sm text-center text-gray-400 md:text-left fade-in">
    //         &copy; <a className="text-blue-300 no-underline hover:text-pink-500 hover:no-underline" href="">Shortener</a> 2023-24 | Made with ❤️ by 
    //         <a className="text-blue-300 no-underline hover:text-pink-500 hover:no-underline" href="https://github.com/HeimanPictures/">AkKiL</a>
    //     </div>
    // </div>

    <div className="flex flex-col items-center min-h-screen bg-white">
      <header className="flex items-center justify-between w-full px-8 py-4 shadow-md">
        <div className="text-xl font-bold">
          <a className="flex-grow font-semibold text-2x1" href="/">
            <img src='./assets/logo-dark.png' className='w-40 no-drag' alt='Encrypto' />
          </a>
        </div>
        <div>
          <button className="mr-4 text-gray-600 hover:text-gray-900">Log in</button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md">Sign up</button>
        </div>
      </header>
      <div className='flex'>
        {/* <main className="flex items-center justify-center flex-1 p-8 text-center flex-col-1">
          <h1 className="mb-4 text-4xl font-bold">Remove Image Background</h1>
          <p className="mb-8 text-xl text-gray-600">100% Automatically and <span className="text-yellow-500">Free</span></p>
          <div className="relative p-8 bg-white rounded-lg shadow-lg">
            <button className="px-8 py-4 mb-4 text-white bg-blue-600 rounded-md">Upload Image</button>
            <p className="text-gray-600">or drop a file, paste image or <a href="/" className="text-blue-600">URL</a></p>
          </div>
      </main> */}
        <div className=''>
          <video preload="auto" className="w-full h-auto rounded-4xl max-w-[320px] lg:max-w-[420px]" poster="https://sb.kaleidousercontent.com/67418/840x560/686381d375/emilia-poster.jpg" playsInline={true} src="https://sb.kaleidousercontent.com/67418/x/681f13b37d/emilia_compressed.mp4"></video>
        </div>
        <main className="items-center justify-center flex-1 p-8 text-center flex-col-1">
          <h1 className="mb-4 text-4xl font-bold">Remove Image Background</h1>
          <p className="mb-8 text-xl text-gray-600">100% Automatically and <span className="text-yellow-500">Free</span></p>
          <div className="relative p-8 bg-white rounded-lg shadow-lg">
            <button className="px-8 py-4 mb-4 text-white bg-blue-600 rounded-md">Upload Image</button>
            <p className="text-gray-600">or drop a file, paste image or <a href="/" className="text-blue-600">URL</a></p>
          </div>
        </main>
      </div>
    </div>
  );
};