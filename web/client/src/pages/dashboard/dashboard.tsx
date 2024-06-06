import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardMain } from './layers/main';
import { DashboardSettings } from './layers/settings';
import axios from 'axios';

const DashboardHeader: React.FC = () => {
  var [dropdown, setDropdown] = useState(false);
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || token === undefined) {
      navigation('/signin');
    }
  })
  const getSignout = () => {
    localStorage.removeItem('token');
    navigation('/signin');
  }
  const workDropdown = () => {
    setDropdown(true);
  }
  return (
  <>
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <a href="/" className="flex ms-2 md:me-24">
              <img src="/assets/logo.png" className="h-8 me-3" alt="Cryptography Project" />
            </a>
          </div>
          <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user" onClick={workDropdown}>
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      Akkil M G
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      akkilcharanmg@gmail.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a onClick={getSignout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </nav>

    <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
                <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                  <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3 dark:bg-gray-700 dark:text-gray-300">Home</span>
                </a>
            </li>
            <li>
                <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                  <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3 dark:bg-gray-700 dark:text-gray-300">Home</span>
                </a>
            </li>
            <li>
                <a href="/encrypt" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src="/assets/ende.svg" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Image Encryption</span>
                </a>
            </li>
            <li>
                <a href="/decrypt" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src="/assets/ende.svg" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Image Decryption</span>
                </a>
            </li>
            <li>
                <a href="/sqlinjection" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src="/assets/sqlinjection.svg" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="flex-1 ms-3 whitespace-nowrap">SQL Injection</span>
                </a>
            </li>
          </ul>
          { isAdmin && (
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
                <a href="/dashboard/user" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <svg fill='currentColor' className="flex-shrink-0 text-gray-500 transition duration-75 w-7 h-7 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 48 60" enableBackground="new 0 0 48 48">
                    <g><circle cx="11.1" cy="12.2" r="5.2"/><path d="M20.5,28.8c-2.2-1.2-3.6-3.6-3.6-6.2c0-0.3,0-0.7,0.1-1c-1.7-1-3.7-1.6-5.8-1.6c-5.4,0-9.8,3.7-11.1,8.7   c-0.3,1,0.6,2,1.6,2h14.8C17.6,29.8,19,29.2,20.5,28.8z"/><circle cx="36.9" cy="12.2" r="5.2"/><path d="M48,28.6c-1.2-5-5.7-8.7-11-8.7c-2.1,0-4.1,0.6-5.8,1.6c0.1,0.3,0.1,0.6,0.1,1c0,2.7-1.5,5-3.6,6.2c1.5,0.4,2.8,1,4,1.9   h14.8C47.4,30.6,48.2,29.6,48,28.6z"/><circle cx="24" cy="22.5" r="5.2"/><path d="M24,30.3c-5.4,0-9.8,3.7-11,8.7c-0.2,1,0.6,2,1.6,2h18.9c1.1,0,1.9-1,1.6-2C33.8,34,29.4,30.3,24,30.3z"/></g>
                  </svg>
                  <span className="ms-3">Users</span>
                </a>
            </li>
            <li>
                <a href="/dashboard/cases" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <svg fill='currentColor' className="flex-shrink-0 text-gray-500 transition duration-75 w-7 h-7 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px">
                    <path d="M18,38c-4.963,0-9,4.038-9,9s4.037,9,9,9,9-4.038,9-9-4.037-9-9-9Zm0,16c-3.859,0-7-3.14-7-7s3.141-7,7-7,7,3.14,7,7-3.141,7-7,7Z"/><path d="M61.786,55.382l-7.786-9.91V3c0-.552-.447-1-1-1H3c-.553,0-1,.448-1,1V59c0,.552,.447,1,1,1H51.943l1.271,1.618c.196,.25,.49,.382,.787,.382,.201,0,.404-.061,.58-.186l7-5c.223-.159,.37-.402,.409-.672,.038-.27-.035-.544-.204-.759Zm-11.415,2.618H4V4H52V42.927l-1.214-1.544c-.33-.42-.933-.508-1.367-.196l-2.771,1.979-1.966-2.946c2.605-1.807,4.318-4.815,4.318-8.219,0-5.514-4.486-10-10-10s-10,4.486-10,10,4.486,10,10,10c1.394,0,2.721-.288,3.928-.806l2.091,3.135-2.6,1.857c-.223,.159-.37,.402-.409,.672-.038,.27,.035,.544,.204,.759l8.157,10.382Zm-11.371-18c-4.411,0-8-3.589-8-8s3.589-8,8-8,8,3.589,8,8-3.589,8-8,8Zm15.196,19.631l-9.764-12.426,5.371-3.836,9.764,12.426-5.371,3.836Z"/><rect x="27" y="52" width="17" height="2"/><rect x="31" y="45" width="9" height="2"/><rect x="6" y="34" width="14" height="2"/><rect x="7" y="25" width="4" height="2"/><rect x="13" y="25" width="15" height="2"/><rect x="7" y="19" width="27" height="2"/><rect x="7" y="13" width="39" height="2"/><rect x="13.999" y="7" width="32" height="2"/>
                  </svg>
                  <span className="ms-3">Cases</span>
                </a>
            </li>
          </ul>
          )}
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
                <a href="/help" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <img src="/assets/help.svg" className="flex-shrink-0 text-gray-500 transition duration-75 w-7 h-7 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="ms-3">Help</span>
                </a>
            </li>
            <li>
                <a href="/privacy" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <img src="/assets/privacy.svg" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="ms-3">Privacy Policy</span>
                </a>
            </li>
            <li>
                <a href="/terms" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <img src="/assets/terms.svg" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" height={10} width={10} />
                  <span className="ms-3">Terms & Condition</span>
                </a>
            </li>
            <li>
                <div onClick={getSignout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                </div>
            </li>
          </ul>
      </div>
    </aside>
  </>
  );
};


const DashboardFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full py-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Cryptography Project. All rights reserved.</p>
    </footer>
  );
}

const Dashboard: React.FC = () => {
  var { path } = useParams();
  
  const navigate = useNavigate();
  var somewhere;
  const token = localStorage.getItem('token');
  if (token === null || token === undefined) {
    navigate('/signin');
  }
  if (path === undefined || path === "/" ) {
    somewhere = <DashboardMain />;
  } else if (path === "settings" || path === "setting" ) {
    somewhere = <DashboardSettings />;
  }
  return (
    <>
      <DashboardHeader />
      { somewhere }
    </>
  );
};

export default Dashboard;
