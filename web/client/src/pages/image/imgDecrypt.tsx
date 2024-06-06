/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React, { useState, ChangeEvent } from 'react';
import CryptoJS from 'crypto-js';

export const ImgDecrypt: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? 'text' : 'password';

  const handleEncryptedFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setSelectedFile(e.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  
  const handleDecrypt = () => {
    if (!selectedFile) {
      alert('Please upload an encrypted file first');
      return;
    }
    // console.log(password)
    try {
      const decrypted = CryptoJS.AES.decrypt(selectedFile, password).toString(CryptoJS.enc.Utf8);
      const decryptedDataUrl = `data:image/png;base64,${decrypted}`;
      setDecryptedFile(decryptedDataUrl);
      console.log(decryptedDataUrl)
      const link = document.createElement('a');
      link.href = decryptedDataUrl;
      link.download = "download.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Decryption failed. Please ensure the file and key are correct.');
    }
  };
  return (
    <div className="flex items-end justify-center w-full">
      <div className="relative mr-4 text-left md:w-full lg:w-full xl:w-1/2">
        {decryptedFile ? (
          <div className="py-12 mt-14">
            <div className="mt-14">
              <img src={decryptedFile} alt="Decrypted" />
            </div>
          </div>
        ) : (
        <div className="relative flex items-center justify-center px-4 py-12 bg-no-repeat bg-cover sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0"></div>
            <div className="z-10 w-full p-10 bg-gray-700 bg-opacity-90 sm:max-w-lg rounded-xl">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-200">
                  Upload Encrypted Image!
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  Decrypt your images now!
                </p>
              </div>
              <div className="mt-8 space-y-3"> {/*encType="multipart/form-data">*/}
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
                      <input id="file" name="file" type="file" className="hidden" accept="image/*" onChange={handleEncryptedFileChange} required/>
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
                <button onClick={handleDecrypt} className='px-4 py-2 mt-6 font-bold text-white bg-gray-500 rounded hover:bg-gray-700'>Decrypt Now!</button>
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};
