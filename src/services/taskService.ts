import api from './api';
import { Task } from '../types/task';

export const getProjectTasks = async (projectId: string): Promise<Task[]> => {
  const response = await api.get(`/tasks/${projectId}`);
  return response.data;
};