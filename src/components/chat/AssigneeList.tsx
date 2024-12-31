import React from 'react';
import { AssigneeCard } from '../../types/chat';

interface AssigneeListProps {
  assignees: AssigneeCard[];
  onSelect: (id: string) => void;
}

export function AssigneeList({ assignees, onSelect }: AssigneeListProps) {
  return (
    <div className="space-y-2">
      <p className="text-center">Please select an assignee:</p>
      {assignees.map((assignee) => (
        <div
          key={assignee.id}
          onClick={() => onSelect(assignee.id)}
          className="bg-neutral-800 p-4 rounded-lg cursor-pointer hover:bg-neutral-700"
        >
          <p className="font-medium">{assignee.name}</p>
        </div>
      ))}
    </div>
  );
}