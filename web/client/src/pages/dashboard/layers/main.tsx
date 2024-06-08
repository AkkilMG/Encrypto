/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const DashboardMain: React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      /* Add text "Work in progress" in the middle. */
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-semibold">Work in progress...</h1>
      </div>
    </>
  )
}