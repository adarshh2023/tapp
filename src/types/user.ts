export interface User {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    mobile?: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    activeFlag?: boolean;
    profileImageUrl?: string;
  }
  
  export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    mobile?: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    activeFlag?: boolean;
    profileImageUrl?: string;
  }