import React from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { AssigneeList } from './AssigneeList';
import { TaskCard } from './TaskCard';
import { AssigneeCard, TaskDetails } from '../../types/chat';

interface MessageListProps {
  messages: Message[];
  assignees: AssigneeCard[];
  taskDetails: TaskDetails | null;
  onAssigneeSelect: (id: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ 
  messages, 
  assignees, 
  taskDetails, 
  onAssigneeSelect,
  messagesEndRef 
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}

      {assignees.length > 0 && (
        <AssigneeList assignees={assignees} onSelect={onAssigneeSelect} />
      )}

      {taskDetails && <TaskCard details={taskDetails} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
}