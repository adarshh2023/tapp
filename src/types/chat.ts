export interface Message {
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }
  
  export interface AssigneeCard {
    id: string;
    name: string;
  }
  
  export interface TaskDetails {
    title: string;
    description: string;
    assigneeId: string;
    assignerId: string;
    priority: string;
    startDate: string;
    dueDate: string;
  }