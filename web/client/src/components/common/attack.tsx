/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import React, { useState } from 'react';
import Lottie from 'react-lottie';
import attackData from '../../assets/attack.json';

export const AttackLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: attackData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const [moved, setMoved] = useState(true);

  const handleMoveRight = () => {
    setMoved(false);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <Lottie options={defaultOptions} height={512} width={512} />
    </div>
  );
};