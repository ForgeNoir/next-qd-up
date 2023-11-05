'use client'
import React from 'react';
import { loginWithGoogle } from '../../services/auth.service';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const router = useRouter();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            console.log('Login successful')


        } catch (error) {
            // If loginWithGoogle throws, handle the error here
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h1>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center shadow-lg transition duration-150 ease-in-out"
            >
              Login with Google
            </button>
          </div>
        </div>
    );
};
export default LoginForm;