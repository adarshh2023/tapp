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
  // Phrases to hide
  const undesiredPhrases = [
    "The task has been created with the following details",
    "Please select the assignee",
    "Multiple users are available with"
  ];

  // Filter out the last message if showing assignees
  const displayMessages = assignees.length > 0 
    ? messages.slice(0, -1) 
    : messages;

  // Filter out messages containing any of the undesired phrases
  const filteredMessages = displayMessages.filter((msg) => {
    return !undesiredPhrases.some((phrase) => msg.content.includes(phrase));
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {filteredMessages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}

      {assignees.length > 0 && (
        <AssigneeList assignees={assignees} onSelect={onAssigneeSelect} />
      )}

      {taskDetails && <TaskCard details={taskDetails.task} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
}