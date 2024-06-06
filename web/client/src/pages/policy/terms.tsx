/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */

import React from 'react';
export const Terms = () => {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-row flex-grow h-full">
        <div className="hidden h-full lg:block lg:w-1/3">
          <video className="object-cover w-full h-full no-drag" autoPlay muted loop>
            <source src="/assets/crypto.mp4" type="video/mp4" /> 
              Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-auto h-full m-10 ml-20 overflow-auto bg-opacity-75">
          <div className="max-w-3xl p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Terms & Conditions</h1>
            <p className="mb-4">
              By using the Cryptography Project application, you agree to abide by the following terms and conditions:
            </p>
            <ol className="mb-4 list-decimal list-inside">
              <li>You must be at least 18 years old to use the Cryptography Project application.</li>
              <li>You agree to provide accurate and truthful information when submitting cases and evidence.</li>
              <li>You are solely responsible for the content you submit through the Cryptography Project application.</li>
              <li>You agree not to use the Cryptography Project application for any unlawful or unauthorized purpose.</li>
              <li>Cryptography Project reserves the right to remove any content or suspend your account if it violates these terms and conditions.</li>
              <li>Cryptography Project may collect and use your personal information in accordance with our Privacy Policy.</li>
              <li>The Cryptography Project application and its contents are provided on an "as is" and "as available" basis.</li>
              <li>Cryptography Project disclaims all warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.</li>
              <li>In no event shall Cryptography Project be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the application.</li>
              <li>These terms and conditions constitute the entire agreement between you and Cryptography Project regarding your use of the application.</li>
              <li>Cryptography Project reserves the right to modify or update these terms and conditions at any time without prior notice.</li>
              <li>Your continued use of the Cryptography Project application after any changes to these terms and conditions constitutes acceptance of those changes.</li>
            </ol>
            <p>
              If you have any questions or concerns about these terms and conditions, please contact us at legal@policeconnect.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
