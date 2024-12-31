import React from 'react';
import { Project } from '../../types/auth';
import { formatDate } from '../../utils/date';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <div className="flex items-center space-x-4 p-4">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
    
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-xl font-semibold">{project.name}</h3>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Group created on {formatDate(project.createdAt)}</span>
            {project.unreadCount > 0 && (
              <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-medium">
                {project.unreadCount} unread
              </span>
            )}
          </div>
        </div>
        <span className="text-white text-sm">
          {project.members.length} Members
        </span>
      </div>
    </div>
  </div>
);