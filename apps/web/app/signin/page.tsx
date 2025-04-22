
'use client';
import React, { useRef, useState } from 'react';
import { Mail, Lock, User, Axis3DIcon } from 'lucide-react';
import axios from 'axios';
import { http_server } from '../config';
import { useRouter } from 'next/navigation';


interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {

    const router=useRouter()

   
    const emailref= useRef(null)
    const passref= useRef(null)

    async function signin(){
        //@ts-ignore
        console.log(emailref.current.value)

        const res= await axios.post(`${http_server}signin`,{

            //@ts-ignore
            email:emailref.current.value,
            //@ts-ignore
            password:passref.current.value

        })

console.log(res)
        const token=res.data.token
       
        localStorage.setItem("token",token)

        router.push("/dashboard")
    }

    
 

  return ( <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Signin into  your account</h2>
          
        </div>
        
          <div className="space-y-4">
            <div>
              
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                ref={emailref}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email address"
                 
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                ref={passref}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  
                />
              </div>
            </div>
          </div>

          <div>
            <button
            onClick={signin}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              SIGNIN
            </button>
          </div>
        
       
      </div>
    </div>
  );
}