
"use client"
import React from 'react';
import { LogOut, UserCircle, Users, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {


    const router =useRouter()


  const handleLogout = () => {

    localStorage.removeItem("token")
    
    router.push("/")
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Chat Rooms</h1>
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Profile"
            >
              <UserCircle className="h-8 w-8" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <button
          onClick={()=>{
            router.push("/joinroom")
          }}
            className="w-full max-w-md flex items-center justify-center px-8 py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Users className="h-6 w-6 mr-3" />
            <span className="text-xl font-semibold">Join Room</span>
          </button>

          <button
            className="w-full max-w-md flex items-center justify-center px-8 py-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-6 w-6 mr-3" />
            <span className="text-xl font-semibold">Create Room</span>
          </button>
        </div>
      </main>
    </div>
  );
}