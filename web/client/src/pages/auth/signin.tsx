/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ScreenLoading } from '../../components/common/lottie';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.email === '' || formData.password === '') {
        setError('Please fill in all fields.');
      } else {
        const response = await axios.post('http://localhost:7000/api/auth/signin', formData);
        if (response.status === 200 && response.data.success) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        } else if (response.status === 200 && !response.data.success) {
          setError(response.data.message);
        } else {
          setError("Unable to contact the server.")
        }
      }
    } catch (error) {
      setError("Unable to contact the server.")
    }
  };
  
  return (
    <>
    {loading && (
      <ScreenLoading />
    )}
    <main className="flex flex-col">
      <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
        <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
          <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='Cryptography Project' /></a>
        </div>
      </header>
      <div className="flex flex-row flex-grow">
        <div className="hidden lg:block lg:w-1/3">
          <video className="object-cover w-full h-screen no-drag" autoPlay muted loop>
            <source src="/assets/crypto.mp4" type="video/mp4" /> {/* https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949 */}
              Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 ">
          <div className="w-full max-w-md">
            <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign in to <span> </span><img src='./assets/logo-dark.png' className='w-40 no-drag' alt='Cryptography Project' /></h2>
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> email </label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" 
                  value={formData.email} onChange={handleChange} name="email" type="email" />
              </div>
              <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                  password
                  <a href="/forgot" className="font-sans text-sm font-normal text-gray-600 underline cursor-pointer">Forgot?</a>
                </span>
                <input className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" 
                  value={formData.password} onChange={handleChange} name="password" type="password" />
              </div>
              {error && (
              <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-red-700 text-sl">
                  {error}
                </span>
              </div>
              )}
              <div>
                <button onClick={handleSubmit} className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Sign In</button>
              </div>
              <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?<span> </span>
                <a href="/signup" className="font-sans text-sm text-gray-600 underline cursor-pointer">Sign up </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  );
};