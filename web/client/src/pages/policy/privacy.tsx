/**
 * @author: @AkkilMG
 * @description: Cryptography Project - Encrypto
 */

import React from 'react';

export const Privacy = () => {
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
            <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
            <p className="mb-4">
              At Encrypto, we are committed to protecting your privacy. This Privacy Policy outlines how your personal information is collected, used, and shared when you use our application.
            </p>
            <h2 className="mb-2 text-xl font-bold">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you use our application. This may include your name, contact information, case details, and any evidence you submit.
            </p>
            <h2 className="mb-2 text-xl font-bold">How We Use Your Information</h2>
            <p className="mb-4">
              We may use the information collected to investigate and resolve cases submitted by the public, communicate with users regarding their submissions, and improve our application.
            </p>
            <h2 className="mb-2 text-xl font-bold">Sharing Your Information</h2>
            <p className="mb-4">
              We may share your information with law enforcement agencies, government authorities, or third-party service providers who assist us in providing our services. We may also disclose information in response to legal requests or to protect our rights and interests.
            </p>
            <h2 className="mb-2 text-xl font-bold">Security</h2>
            <p className="mb-4">
              We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h2 className="mb-2 text-xl font-bold">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for any updates.
            </p>
            <h2 className="mb-2 text-xl font-bold">Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about our Privacy Policy or our handling of your information, please contact us at privacy@policeconnect.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
