"use client"

import React, { useRef, useState } from 'react';
import { ArrowLeft, Router, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JoinRoom() {
  const slugref= useRef(null)

  const router=useRouter()

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    console.log('Joining room:'+ slugref.current.value);
    // Handle room joining logic here
  };

  

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4">
        <div className="flex items-center max-w-7xl mx-auto">
          <button
            onClick={()=>{
             router.push("/dashboard")
            }}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="text-lg font-medium">Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
          <div>
            <h2 className="text-3xl font-bold text-white text-center">Join Room</h2>
          </div>
          
          <form onSubmit={handleJoinRoom} className="mt-8 space-y-6">
            <div>
              <label htmlFor="roomSlug" className="block text-sm font-medium text-gray-400 mb-2">
                Room Code
              </label>
              <input
                id="roomSlug"
                type="text"
               ref={slugref}
                required
                className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter room code"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold">Join Room</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}