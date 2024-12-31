import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TaskListHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-white text-4xl font-bold">My Coach</h1>
      </div>
      <button 
        onClick={() => navigate('/chat')}
        className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};