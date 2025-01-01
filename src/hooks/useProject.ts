import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects } from '../services/api';
import { Project } from '../types/auth';

export function useProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects = await getProjects();
        const currentProject = projects.find(p => p._id === projectId);
        setProject(currentProject || null);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return { project, loading };
}