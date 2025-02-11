import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/auth';
import { formatDate } from '../../utils/date';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
  className="flex items-center space-x-4 p-4 cursor-pointer hover:bg-neutral-900 rounded-lg transition-colors"
  onClick={() => navigate(`/projects/${project._id}/tasks`)}
>
  {/* Icon Section */}
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
  
  {/* Content Section */}
  <div className="flex-grow">
    {/* Inner Flex Container: Justify Between */}
    <div className="flex justify-between items-start">
      
      {/* Left Side: Title and Group Creation Date */}
      <div>
        <h3 className="text-white text-xl font-semibold">{project.name}</h3>
        <span className="text-gray-400 text-sm">
          Group created on {formatDate(project.createdAt)}
        </span>
      </div>
      
      {/* Right Side: Unread Count and Members */}
      <div className="flex items-center space-x-2">
        {project.unreadCount > 0 && (
          <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-medium">
            {project.unreadCount}
          </span>
        )}
        <span className="text-white text-sm">
          {project.members.length} Members
        </span>
      </div>
      
    </div>
  </div>
</div>
  );
};