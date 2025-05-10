'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login(){
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to homepage if already logged in
    }
  }, [status]);

  const handleClick = async () => {

    await signIn("google");
  };

  return (
    <div className="flex h-screen w-full">
        <div
          className="w-1/2 relative flex items-center justify-center bg-cover bg-center background-image"
        >
          {/* Overlay Content */}
          <div className="text-center text-white z-10 relative">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="mx-auto w-2/3 h-auto mb-6"
            />
            <h1 className="text-3xl font-bold message">The Art of Wild Roots</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            <h2 className="mb-12 text-2xl font-bold text-gray-800">Login to your account</h2>
            
              <button 
                className="flex items-center justify-center w-full px-4 py-4 text-white bg-primary rounded-md hover:bg-hover-primary focus:outline-none focus:ring-2 focus:ring-primary font-bold mb-8"
                onClick={handleClick}
                >
                <FontAwesomeIcon icon={faGoogle} className='w-5 mx-5' />
                Continue with Google
              </button>
          </div>
        </div>
      
    </div>
  );
};
