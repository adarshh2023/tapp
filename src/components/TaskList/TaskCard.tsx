import React from 'react';
import { Task } from '../../types/task';
import { formatDate } from '../../utils/date';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const getProgressColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'stroke-green-400';
      case 'InProgress':
        return 'stroke-yellow-400';
      case 'Pending':
        return 'stroke-red-400';
      default:
        return 'stroke-gray-400';
    }
  };

  const getDueDateColor = () => {
    if (task.status === 'Completed') return 'text-green-400';
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < now ? 'text-red-400' : 'text-yellow-400';
  };

  const getProgressPercentage = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 100;
      case 'InProgress':
        return 60;
      case 'Pending':
        return 0;
    }
  };

  const percentage = getProgressPercentage(task.status);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center space-x-4 p-4 bg-neutral-900 rounded-lg">
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-neutral-800"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            className={getProgressColor(task.status)}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-white text-xl font-semibold truncate pr-4">
            {task.title}
          </h3>
          <span className="text-gray-400 text-sm whitespace-nowrap">
            {formatDate(task.createdAt)}
          </span>
        </div>
        
        <div className={`text-sm ${getDueDateColor()} mt-1`}>
          Due Date: {formatDate(task.dueDate)}
        </div>
      </div>

      <div className="flex -space-x-2 flex-shrink-0">
        {task.readBy.map((userId, index) => (
          <div
            key={userId}
            className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-black"
            style={{ zIndex: task.readBy.length - index }}
          />
        ))}
      </div>
    </div>
  );
};