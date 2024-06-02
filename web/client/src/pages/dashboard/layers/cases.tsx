/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import no_data from '../../../assets/no_data.json';

export const DashboardCases = () => {
  const token = localStorage.getItem("token");
  const [reports, setReport] = useState([]);
  const navigation = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: no_data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const AllReports = async () => {
    const response = await axios.get(
      'http://localhost:7000/api/police/reports', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    if (response && response.data.success) {
      setReport(response.data.data);
    }
    
    console.log(reports)
  }

  useEffect(() => {
    console.log(reports)
    if (reports && (reports.length === 0 || reports.length < 0)) {
      AllReports()
    }
  })
  return (
    <>
      <div className="p-6 sm:ml-64">
        <div className="rounded-lg mt-14">
          <div className='grid grid-cols-3 gap-6'>
            {(reports.length > 0) ? reports.map((report: any, index: any) => (
            <div key={index} className="p-3 mt-6 text-gray-700 bg-white shadow-md sm:mt-0 rounded-xl w-96">
            <div className="p-6">
                <div className="flex justify-between mt-3">
                  <p className="text-lg font-bold">Case {index+1}</p>
                  <a href={report.IncidentLoc} className="p-1 px-3 py-1 text-sm text-white bg-rose-400 rounded-xl">{report.CrimeType}</a>
                </div>
                <span className="text-gray-500 text-sl">{report.IncidentDate.split('T')[0]}</span>
                <br />
                <span className="text-gray-500 text-sl">{report.EvidenceDesc}</span>
                <br />
                <span className="text-gray-500 text-sl">{report.SuspeciousDesc}</span>
                <div className="flex justify-between mt-3 space-x-3">
                  <a href={report.EvidenceDoc} className="flex items-center p-1 px-3 text-white bg-blue-500 rounded-lg">
                    Evidence!
                  </a>
                  <a href={report.SuspeciousDocs} className="flex items-center p-1 px-3 text-white bg-green-500 rounded-lg">
                    Suspecious!
                  </a>
                </div>
              </div>
            </div>
            )): (
              <>
                <div></div>
                <div className='flex items-center justify-center col-span-1 py-20 pr-12 no-drag'>
                  <Lottie options={defaultOptions} height={512} width={512} />
                </div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


