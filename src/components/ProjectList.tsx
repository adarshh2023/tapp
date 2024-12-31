import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../services/api';
import { Project } from '../types/auth';
import { FilterButton } from './ui/FilterButton';
import { ProjectCard } from './ui/ProjectCard';
import { BottomNav } from './ui/BottomNav';
import toast from 'react-hot-toast';

type Filter = 'All' | 'Unread' | 'Read' | 'Projects';

export default function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    switch (activeFilter) {
      case 'Unread':
        return project.unreadCount > 0;
      case 'Read':
        return project.unreadCount === 0;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-4xl font-bold">Projects</h1>
          <button 
            onClick={() => navigate('/projects/create')}
            className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {(['All', 'Unread', 'Read', 'Projects'] as Filter[]).map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}