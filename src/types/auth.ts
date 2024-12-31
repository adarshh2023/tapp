export interface LoginResponse {
  token: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  members: {
    userId: string;
    role: string;
    _id: string;
  }[];
  unreadCount: number;
}