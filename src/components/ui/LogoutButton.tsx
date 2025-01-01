import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-white"
    >
      <LogOut className="w-5 h-5" />
      <span></span>
    </button>
  );
};