/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import no_data from '../../../assets/no_data.json';

export const DashboardUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigation = useNavigate();
  const Roles = ["", "User", "Personnel", "Officer"]
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: no_data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const recent_cases = async () => {
    const response = await axios.get(
      'http://localhost:7000/api/auth/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    if (response && response.data.success) {
      setUsers(response.data.data);
    }
  }

  const handleDeleteUser = async (key: number) => {
    var user = users as {
      UserID: string;
      Username: string;
      Password: string;
      Email: string;
      PhoneNumber: string;
      WANumber: string;
      AccStatus: number;
      RoleID: number;
    }[];
    if (user && user.length > 0 && user[key]) {
    const response = await axios.post(
      'http://localhost:7000/api/auth/delete-user', {
        DelUserID: user[key].UserID
      }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }
    );
    if (response && response.data.success) {
      setUsers(response.data.data);
    }
  }
  }

  useEffect(() => {
    recent_cases()
  })
  return (
    <>
      <div className="p-6 sm:ml-64">
        <div className="rounded-lg mt-14">
          <div className='grid grid-cols-3 gap-6'>
            {users ? users.map((user: any, index: any) => (
            <div key={index} className="p-3 mt-6 text-gray-700 bg-white shadow-md sm:mt-0 rounded-xl w-96">
              <div className="p-6">
                <div className="flex justify-between mt-3">
                  <p className="text-lg font-bold">{user.Username}</p>
                  <p className="p-1 px-3 py-1 text-sm text-white bg-rose-400 rounded-xl">{Roles[Number(user.RoleID)]}</p>
                </div>
                <a className="text-gray-500 text-sl" href={`tel:${user.Email}`}>{user.Email}</a>
                <div className="flex justify-between mt-3 space-x-3">
                  <a href={`tel:${user.PhoneNumber}`} className="flex items-center p-1 px-3 text-white bg-blue-500 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-1h2a2 2 0 002-2V6a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zM8 12a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zm8-8H4v10h12V4z" clipRule="evenodd" />
                    </svg>
                    Call Now!
                  </a>
                  <a href={`whatsapp://send?abid=${user.WANumber}`} className="flex items-center p-1 px-3 text-white bg-green-500 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" className="w-5 h-5 mr-1" viewBox="0 0 48 48">
                      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                    </svg>
                    Message!
                  </a>
                  <button onClick={() => {handleDeleteUser(index)}} className="flex items-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" className="w-10 h-10 mr-1 text-red-500" fill='red' viewBox="0 0 64 64">
                      <path d="M 28 6 C 25.791 6 24 7.791 24 10 L 24 12 L 23.599609 12 L 10 14 L 10 17 L 54 17 L 54 14 L 40.400391 12 L 40 12 L 40 10 C 40 7.791 38.209 6 36 6 L 28 6 z M 28 10 L 36 10 L 36 12 L 28 12 L 28 10 z M 12 19 L 14.701172 52.322266 C 14.869172 54.399266 16.605453 56 18.689453 56 L 45.3125 56 C 47.3965 56 49.129828 54.401219 49.298828 52.324219 L 51.923828 20 L 12 19 z M 20 26 C 21.105 26 22 26.895 22 28 L 22 51 L 19 51 L 18 28 C 18 26.895 18.895 26 20 26 z M 32 26 C 33.657 26 35 27.343 35 29 L 35 51 L 29 51 L 29 29 C 29 27.343 30.343 26 32 26 z M 44 26 C 45.105 26 46 26.895 46 28 L 45 51 L 42 51 L 42 28 C 42 26.895 42.895 26 44 26 z"></path>
                    </svg>
                  </button>
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


