/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { AttackLoading } from '../../components/common/attack';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/common/header';
import { Footer } from '../../components/common/footer';

export const ImgDecryptLink: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  var { id } = useParams();
  
  useEffect(() => {
    getFile();
  }, []);

  const getFile = async () => {
    const response = await axios.post('http://localhost:7000/api/crypto/image-decryption', { 'code': id });
    if (response.status === 200 && response.data.success) {
        setDownloadUrl(response.data['durl']);
        setName(response.data['name']);
      } else if (response.status === 200 && !response.data.success) {
        alert(response.data.message);
      } else {
        console.log(response.statusText)
        alert("Unable to contact the server.")
      }
    setLoading(false)
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? 'text' : 'password';

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  
  const getDecryptedImage = async () => {
    setLoading(true)
    if (downloadUrl === null || name === null) {
      setLoading(false)
      alert('Please generate image first');
      return;
    }
    try {
      const response = await axios.get(downloadUrl, { responseType: 'blob' });
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        const encryptedContent = event.target.result;
        const decrypted = CryptoJS.AES.decrypt(encryptedContent, password).toString(CryptoJS.enc.Utf8);
        const decryptedDataUrl = `data:image/png;base64,${decrypted}`;
        setDecryptedFile(decryptedDataUrl);
        const link = document.createElement('a');
        link.href = decryptedDataUrl;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      fileReader.readAsText(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert('Decryption failed. Please ensure the file and key are correct.');
    }
  };
  
  return (
    <>
      {loading && (
        <AttackLoading />
      )}
      <div className="flex flex-col w-full min-h-screen bg-fixed bg-black bg-no-repeat bg-cover bg-opacity-85 backdrop-blur-sm" id="journal-scroll" style={{backgroundImage: `url("/assets/home.jpg")`}}>
        <Header />
        <div className="flex items-end justify-center w-full">
          <div className="relative mr-4 text-left md:w-full lg:w-full xl:w-1/2">
            <div className="py-12 mt-14">
              <div className="mt-14">
              {decryptedFile ? (
                <img src={decryptedFile} alt="Decrypted" />
              ) : (
                <div>
                  <div className="relative flex items-center justify-center px-4 py-12 bg-no-repeat bg-cover mt-14 sm:px-6 lg:px-8">
                    <div className="absolute inset-0 z-0 mt-14 py-14"></div>
                    <div className="z-10 w-full p-10 bg-gray-700 py-14 bg-opacity-90 sm:max-w-lg rounded-xl">
                      <div className="mt-6">
                        <input type={inputType} placeholder="Enter Password" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-200" value={password} onChange={handlePasswordChange} />
                        <div className="flex items-center mt-2">
                          <input type="checkbox" className="mr-2" checked={showPassword} onChange={toggleShowPassword} /> 
                          <span className="text-sm text-gray-600 dark:text-gray-400">Show Password</span>
                        </div>
                        <button onClick={getDecryptedImage} className='px-4 py-2 mt-6 font-bold text-white bg-gray-500 rounded hover:bg-gray-700'>Decrypt Now!</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
