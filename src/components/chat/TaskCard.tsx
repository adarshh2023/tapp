import React from 'react';
import { TaskDetails } from '../../types/chat';

interface TaskCardProps {
  details: TaskDetails;
}

export function TaskCard({ details }: TaskCardProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <h3 className="font-bold mb-2">Task Created Successfully!</h3>
      <div className="space-y-1">
        <p><span className="font-medium">Title:</span> {details.title}</p>
        <p><span className="font-medium">Description:</span> {details.description}</p>
        <p><span className="font-medium">Priority:</span> {details.priority}</p>
        <p><span className="font-medium">Start Date:</span> {details.startDate}</p>
        <p><span className="font-medium">Due Date:</span> {details.dueDate}</p>
      </div>
    </div>
  );
}