export interface Task {
    _id: string;
    title: string;
    description: string;
    assigneeId: string;
    assignerId: string;
    projectId: string;
    chatId: string;
    status: 'InProgress' | 'Completed' | 'Pending';
    priority: 'High' | 'Medium' | 'Low';
    startDate: string;
    dueDate: string;
    activeFlag: boolean;
    readBy: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export const taskStatusColors = {
    InProgress: 'bg-yellow-400',
    Completed: 'bg-green-400',
    Pending: 'bg-gray-400'
  } as const;
  
  export const priorityColors = {
    High: 'bg-red-400',
    Medium: 'bg-orange-400',
    Low: 'bg-blue-400'
  } as const;