import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTasks } from '../../services/taskService';
import { Task } from '../../types/task';
import { TaskListHeader } from './TaskListHeader';
import { TaskFilters } from './TaskFilters';
import { TaskCard } from './TaskCard';
import { BottomNav } from '../ui/BottomNav';
import toast from 'react-hot-toast';

type Filter = 'All' | 'Assigned to me' | 'Due Today' | 'Upcoming';

export default function TaskList() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!projectId) return;
        const data = await getProjectTasks(projectId);
        setTasks(data);
      } catch (error: any) {
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeFilter) {
      case 'Assigned to me':
        return userId && task.assigneeId === userId;
      case 'Due Today':
        return task.dueDate.split('T')[0] === today;
      case 'Upcoming':
        return new Date(task.dueDate) > new Date();
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="p-6">
        <TaskListHeader />
        
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4 mt-6">
          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No tasks found
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}