
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { AttackLoading } from '../../components/common/attack';
import { CompletedLoading } from '../../components/common/completed';

export const SQLInjection: FC = () => {
  const [url, setURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [hack, setHack] = useState('')
  const [completed, setCompleted] = useState(false)
  const handleURLChange = (e: any) => {
    setURL(e.target.value);
  };

  useEffect(() => {
    if (completed === true) {
      const timer = setTimeout(() => {
        setCompleted(false);
      }, 2000);
      return () => clearTimeout(timer); // Clear the timer when the component unmount
    }
  }, []);

  const sqlInject = async () => {
    setLoading(true)
    if (url === '') {
      setLoading(false)
      alert('Please provide a URL to inject')
      return
    }
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
      try {
        var formData = { 'url': url.trim() }
        console.log("started")
        const response = await axios.post('http://localhost:7000/api/crypto/sql-injection', formData);
        console.log("Done")
        if (response.status === 200 && response.data.success) {
          setHack(response.data.tables)
          console.log(response.data)
          setLoading(false)
        } else if (response.status === 200 && !response.data.success) {
          setLoading(false)
          alert(response.data.message);
        } else {
          setLoading(false)
          alert("Unable to contact the server.")
        }
      } catch (e: any) {
        setLoading(false)
        alert('An error occurred')
      }
    } else {
      setLoading(false)
      alert('Invalid URL')
    }
  }
  return (
    <>
    {loading && (
      <AttackLoading />
    )}
    {completed && (
      <CompletedLoading />
    )}
    <div className='m-16 leading-normal tracking-normal text-indigo-400 mb:m-6'>
      <div className="h-full m-16">
        <div className="flex items-center justify-between">
            <div className="container flex flex-col flex-wrap items-center pt-24 mx-auto md:pt-36 md:flex-row">
                <div className="flex flex-col justify-center w-full overflow-y-hidden">
                    <form className="w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg opacity-90">
                        <div className="mb-4">
                          <label className="block py-2 mb-2 font-bold text-blue-300" htmlFor="emailaddress">
                            {(hack===null || hack===undefined || hack==='') ? ('URL to do SQL Injection') : ('The website is vulnerable, here are the table variables.') }
                          </label>
                          {(hack===null || hack===undefined || hack==='') ? (
                            <input className="w-full p-3 leading-tight text-gray-700 transition duration-300 ease-in-out transform border rounded shadow appearance-none focus:ring hover:scale-105 form-control"
                              id="text" type="text" placeholder="https://example.com/"
                              onChange={handleURLChange}
                            />
                          ) : (
                            <input className="w-full p-3 leading-tight text-gray-700 transition duration-300 ease-in-out transform border rounded shadow appearance-none focus:ring hover:scale-105 form-control"
                              id="text" type="textarea" placeholder="https://example.com/"
                              onChange={handleURLChange} value={hack} readOnly
                            />
                          )}
                        </div>
                        {(hack===null || hack===undefined || hack==='') && (<div className="flex items-center justify-between pt-4">
                            <div className="input-group-append">
                                <button
                                    className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform rounded bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 focus:ring hover:scale-105 btn btn-primary"
                                    onClick={sqlInject}
                                    type="button"
                                    id="searchbtn"
                                >
                                Inject
                                </button>
                            </div>
                        </div>)}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};
