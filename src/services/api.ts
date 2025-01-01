import axios from 'axios';
import { User, UserProfile } from '../types/user';

const api = axios.create({
  baseURL: '/api',
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginWithEmail = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const sendOtp = async (mobile: string) => {
  const response = await api.post('/auth/sendOtp', { mobile });
  return response.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
  const response = await api.post('/auth/loginWithOtp', { mobile, otp });
  return response.data;
};

// User APIs
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const getCompanyUsers = async (companyId: string): Promise<User[]> => {
  const response = await api.get(`/users/company/${companyId}/users`);
  return response.data;
};

// Project APIs
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (projectData: {
  name: string;
  description: string;
  members: { userId: string; role: string }[];
  ownerId: string;
  status: string;
}) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export default api;