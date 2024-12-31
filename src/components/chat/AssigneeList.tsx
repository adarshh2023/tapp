import React from 'react';
import { AssigneeCard } from '../../types/chat';
import { User } from 'lucide-react';

interface AssigneeListProps {
  assignees: AssigneeCard[];
  onSelect: (id: string) => void;
}

export function AssigneeList({ assignees, onSelect }: AssigneeListProps) {
  return (
    <div className="space-y-4">
      <p className="text-center text-gray-400">Please select an assignee:</p>
      <div className="grid gap-3">
        {assignees.map((assignee) => (
          <div
            key={assignee.id}
            onClick={() => onSelect(assignee._id)}
            className="bg-neutral-800 p-4 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-neutral-700 rounded-full">
                <User className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="font-medium text-white">{assignee.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}