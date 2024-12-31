import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChatHeader } from './chat/ChatHeader';
import { ChatInput } from './chat/ChatInput';
import { MessageList } from './chat/MessageList';
import { Message, AssigneeCard, TaskDetails } from '../types/chat';
import { generateChatRoomKey, sendChatMessage } from '../services/chatService';
import toast from 'react-hot-toast';

export default function ChatScreen() {
  const { projectId } = useParams<{ projectId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatId, setChatId] = useState<string>('');
  const [assignees, setAssignees] = useState<AssigneeCard[]>([]);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      const newChatId = await generateChatRoomKey();
      setChatId(newChatId);
    } catch (error) {
      toast.error('Failed to initialize chat');
    }
  };

  const parseAssignees = (message: string) => {
    try {
      const startIndex = message.indexOf('[');
      const endIndex = message.lastIndexOf(']');
      if (startIndex !== -1 && endIndex !== -1) {
        const jsonStr = message.substring(startIndex, endIndex + 1);
        return JSON.parse(jsonStr);
      }
    } catch (error) {
      console.error('Failed to parse assignees:', error);
    }
    return [];
  };

  const parseTaskDetails = (message: string) => {
    try {
      const detailsStr = message.substring(message.indexOf('{'), message.lastIndexOf('}') + 1);
      return JSON.parse(detailsStr);
    } catch (error) {
      console.error('Failed to parse task details:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    console.log(inputMessage);
    if (!inputMessage.trim() || !projectId) return;

    const newUserMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    try {
      const assistantMessage = await sendChatMessage(
        projectId,
        inputMessage,
        chatId
      );
      
      if (assistantMessage.includes("Please select the assignee") || 
          assistantMessage.includes("Multiple users are available with")) {
        setAssignees(parseAssignees(assistantMessage));
      } else if (assistantMessage.includes("The task has been created with the following details")) {
        setTaskDetails(parseTaskDetails(assistantMessage));
      }

      setMessages(prev => [...prev, {
        type: 'assistant',
        content: assistantMessage,
        timestamp: new Date()
      }]);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleAssigneeSelect = (assigneeId: string) => {
    setAssignees([]);
    setInputMessage(assigneeId);
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ChatHeader />
      <MessageList
        messages={messages}
        assignees={assignees}
        taskDetails={taskDetails}
        onAssigneeSelect={handleAssigneeSelect}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
}