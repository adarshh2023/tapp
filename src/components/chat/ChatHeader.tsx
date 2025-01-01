import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  projectName?: string;
}

export function ChatHeader({ projectName }: ChatHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 border-b border-neutral-800">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{projectName || 'Create Task'}</h1>
          <p className="text-sm text-gray-400">Create a new task</p>
        </div>
      </div>
    </div>
  );
}