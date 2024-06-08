/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import React, { useState, ChangeEvent } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { AttackLoading } from '../../components/common/attack';

export const ImgEncrypt: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [encryptedFile, setEncryptedFile] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dl, setDL] = useState('');
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? 'text' : 'password';

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value.trim());
  };

  const downloadFile = () => {
    if (dl !== null && dl !== '') {
      const link = document.createElement('a');
      link.href = dl;
      link.download = 'download.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No file to download')
    }
  }

  const handleEncrypt = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert('Please select a file');
      setLoading(false);
      return;
    }
    if (password === '') {
      alert('Please provide password to secure the file.');
      setLoading(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      console.log("Encrypting file...")
      if (event.target) {
        console.log("Entered here")
        const fileContent = (event.target.result as string).split(',')[1];
        const encrypted = CryptoJS.AES.encrypt(fileContent, password).toString();
        const blob = new Blob([encrypted], { type: 'text/plain' });
        try {
          const formData = new FormData();
          formData.append('file', blob, selectedFile.name);
          console.log("Uploading file...");
          const config = {
            headers: {
              // accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          };
          axios
            .post('https://picdb-api.onrender.com/api/v1/upload', formData, config)
            .then((response: any) => {
              if (response.data['success'] === true) {
                const token = localStorage.getItem('token'); 
                setDL(response.data['durl']);
                var formo = {
                  "name": selectedFile.name,
                  "ext": selectedFile.name.split('.').pop(),
                  "durl": response.data['durl'],
                  "key": password,
                }
                axios.post('http://localhost:7000/api/crypto/image-encryption', formo, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'multipart/form-data'
                    }
                }).then((resp: any) => {
                  console.log(resp)
                  if (resp.data['success'] === false) {
                    setLoading(false);
                    return alert('Error uploading file: ' + resp.data.message);
                  }
                  setEncryptedFile(`${window.location.origin}/decrypt/${resp.data['code']}`);
                  setLoading(false);
                }).catch((error: any) => {
                  setLoading(false);
                  alert('Error uploading file: ' + error);
                });
              } else {
                console.log("Error: "+response.data['message']);
                setLoading(false);
                alert('Error uploading file');
              }
            })
            .catch((error: any) => {
              setLoading(false);
              alert('Error uploading file: ' + error);
            });
        } catch (error: any) {
          setLoading(false);
          alert('Error uploading file:' + error);
        }
      } else {
        setLoading(false);
        alert('Error reading file');
      }
    };
    console.log(encryptedFile)
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
    {loading && (
      <AttackLoading />
    )}
    <div className="flex items-end justify-center w-full">
      <div className="relative mr-4 text-left md:w-full lg:w-full xl:w-1/2">
        { (encryptedFile !== null) ? (
          <div className="relative flex items-center justify-center px-4 py-12 bg-no-repeat bg-cover mt-14 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 mt-14 py-14"></div>
            <div className="z-10 w-full p-10 bg-gray-700 py-14 bg-opacity-90 sm:max-w-lg rounded-xl">
              <div className="mt-8 space-y-3">  {/*encType="multipart/form-data">*/}
                {/* <div className="grid grid-cols-1 space-y-2"> */}
                  <label className="text-sm font-bold tracking-wide text-gray-200">
                  URL of encrypted image!
                  </label>
                  <div className="w-full">
                    {/* <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20"> */}
                      <input type="text" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-200" 
                        value={encryptedFile} disabled />
                    {/* </label> */}
                  </div>
                {/* </div> */}
                <button onClick={downloadFile} className='px-4 py-2 mt-6 font-bold text-white bg-gray-500 rounded hover:bg-gray-700'>Download!</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center px-4 py-12 bg-no-repeat bg-cover sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0"></div>
            <div className="z-10 w-full p-10 bg-gray-700 bg-opacity-90 sm:max-w-lg rounded-xl">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-200">
                  Image Upload!
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  Encrypt your images now!
                </p>
              </div>
              <div className="mt-8 space-y-3">  {/*encType="multipart/form-data">*/}
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-200">
                    Attach Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="flex flex-auto">
                          <img className="object-center h-36" src="/assets/upload.png" alt="upload" />
                        </div>
                        <p className="text-center text-gray-200 pointer-none">
                          <span className="text-sm">Drag and drop</span>{' '}
                                  images here <br /> or{' '}
                          <span className="text-blue-600">
                                    Click to upload
                          </span>{' '}
                                  from your computer
                        </p>
                      </div>
                      <input id="file" name="file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} required/>
                    </label>
                  </div>
                  <p className="text-sm text-gray-200 pointer-none">
                    <span>File type: jpg, png, jpeg, etc.</span>
                  </p>
                </div>
                <div className="mt-6">
                  <input type={inputType} placeholder="Enter Password" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-200" value={password} onChange={handlePasswordChange} />
                  <div className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" checked={showPassword} onChange={toggleShowPassword} /> 
                    <span className="text-sm text-gray-600 dark:text-gray-400">Show Password</span>
                  </div>
                </div>
                <button onClick={handleEncrypt} className='px-4 py-2 mt-6 font-bold text-white bg-gray-500 rounded hover:bg-gray-700'>Encrypt Now!</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
)}