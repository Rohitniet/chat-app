
'use client';
import React from 'react';

import { MessageSquare, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

function App() {

  const router =useRouter()
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">ChatFlow</span>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors " onClick={()=>{router.push("/signin")}}>
              Sign in
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>{router.push("/signup")}}>
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Connect and Chat with <br />
            <span className="text-blue-500">Anyone, Anywhere</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mb-8">
            Experience seamless communication with our modern chat platform.
            Connect with friends, family, and colleagues in real-time.
          </p>
          <button className="group flex items-center space-x-2 px-8 py-4 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-gray-800 rounded-xl">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Group Chats</h3>
            <p className="text-gray-400">
              Create and manage multiple group conversations with ease.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <Shield className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Messaging</h3>
            <p className="text-gray-400">
              End-to-end encryption ensures your conversations stay private.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <Zap className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-gray-400">
              Instant message delivery for smooth conversations.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-500" />
            <span className="font-semibold">ChatFlow</span>
          </div>
          <p className="text-gray-500">© 2025 ChatFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;