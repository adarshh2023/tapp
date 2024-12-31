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
  // Filter out the last message if showing assignees
  const displayMessages = assignees.length > 0 
    ? messages.slice(0, -1) 
    : messages;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {displayMessages.map((message, index) => (
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