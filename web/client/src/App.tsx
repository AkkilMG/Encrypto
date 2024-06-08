import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Signin } from './pages/auth/signin';
import { Signup } from './pages/auth/signup';
import { Home } from './pages/home/Home';
import { NotFoundPage } from './pages/extras/NotFound';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';
import { ScreenLoading } from './components/common/lottie';
import { ForgotForm } from './pages/auth/ForgotForm';
import Dashboard from './pages/dashboard/dashboard';
import { Privacy } from './pages/policy/privacy';
import { Terms } from './pages/policy/terms';
import axios from 'axios';
import { ImgEncrypt } from './pages/image/imgEncrypt';
import { ImgDecrypt } from './pages/image/imgDecrypt';
import { SQLInjection } from './pages/sqlinjection/sqlinjection';
import { ImgDecryptLink } from './pages/image/imgDecryptLink';


const Routing: React.FC = () => {
  var { path } = useParams();
  // console.log(path);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  let component;
  console.log(path);
  if (path === undefined || path === "/") {
    component = <Home />
  } else if (path==="encrypt") {
    component = <ImgEncrypt />
    // with /secure/<id> show a page and with secure another page, secure should get the id
  } else if (path==="decrypt") {
    component = <ImgDecrypt />
  } else if (path==="sqlinjection") {
    component = <SQLInjection />
  } else {
    component = <NotFoundPage />;
  }
  return (
    <>
      {loading && (
        <ScreenLoading />
      )}
      <div className="flex flex-col w-full min-h-screen bg-fixed bg-black bg-no-repeat bg-cover bg-opacity-85 backdrop-blur-sm" id="journal-scroll" style={{backgroundImage: `url("/assets/home.jpg")`}}>
        <Header />
        {component}
        <Footer />
      </div>
    </>
    
  );
};

export const App = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem('token');

  // const logout = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:7000/api/auth/check-token', {
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': `Bearer ${token}`
  //           }
  //       }
  //     );
  //     console.log(response);
  //     if (response && !response.data.success) {
  //       localStorage.removeItem('token');
  //       navigation("/signin");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // useEffect(() => {
  //   logout();
  // }, []);
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotForm />} />
      {/* Policy */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* Crypto */}
      {/* <Route path="/encrypt" element={<ImgEncrypt />} />*/}
      <Route path="/decrypt/:id" element={<ImgDecryptLink />} />

      {/* <Route path="/sqlinjection" element={<SQLInjection />} /> */}
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:path" element={<Dashboard />} />
      {/* Other routing */}
      <Route path="/" element={<Home />} />
      <Route path="/:path" element={<Routing />} />
    </Routes>
  );
};
