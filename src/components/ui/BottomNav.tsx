import React from 'react';
import { Home, LogOut, MessageSquare, User } from 'lucide-react';
import { LogoutButton } from './LogoutButton';
import { useNavigate } from 'react-router-dom';

export const BottomNav = () => {
  const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
      toast.success('Logged out successfully');
    };
  return (
  
  <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-neutral-800 p-4">
    <div className="flex justify-around items-center max-w-sm mx-auto">
      <button className="text-white p-2">
        <Home className="w-6 h-6" />
      </button>
      <button className="text-white p-2">
        <MessageSquare className="w-6 h-6" />
      </button>
      <button className="text-white p-2">
        <User className="w-6 h-6" />
      </button>

      
      <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        AI
      </button>
      <button className="text-white p-2" onClick={handleLogout}>
        <LogOut className="w-6 h-6" />
      </button>
    </div>
  </div>
);
};