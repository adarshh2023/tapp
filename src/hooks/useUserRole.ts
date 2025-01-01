import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects, getUserProfile } from '../services/api';
import { Project } from '../types/auth';
import { UserProfile } from '../types/user';
import toast from 'react-hot-toast';

export function useUserRole() {
  const { projectId } = useParams<{ projectId: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, profile] = await Promise.all([
          getProjects(),
          getUserProfile()
        ]);
        setProjects(projectsData);
        setUserProfile(profile);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch data');
      }
    };
    const fetchUserRole = async () => {
      try {
        const projects = await getProjects();
        const currentProject = projects.find(p => p._id === projectId);
        console.log(userProfile?._id);
        const userId = userProfile?._id;
        console.log(userId);
        if (currentProject && userId) {
          const userMember = currentProject.members.find(m => m.userId === userId);
          setUserRole(userMember?.role || null);
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
    fetchData();
  }, [projectId]);

  return { userRole, loading };
}