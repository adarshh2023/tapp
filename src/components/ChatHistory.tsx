import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getChatHistory } from '../services/chatService';
import { ChatInput } from './chat/ChatInput';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatHistoryResponse {
  messages: Message[];
}

export default function ChatHistory() {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (!chatId) return;
        const response = await getChatHistory(chatId);
        setMessages(response.messages);
      } catch (error) {
        toast.error('Failed to fetch chat history');
      }
    };

    fetchChatHistory();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const renderMessageContent = (content: string) => {
    console.log(content);
    console.log(isJsonString(content));
    if (isJsonString(content)) {
        console.log(true);
      const taskDetails = JSON.parse(content);
      return (
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Task Details</h3>
          <div className="space-y-1">
            <p><span className="font-medium">Title:</span> {taskDetails.title}</p>
            <p><span className="font-medium">Description:</span> {taskDetails.description}</p>
            <p><span className="font-medium">Priority:</span> {taskDetails.priority}</p>
            <p><span className="font-medium">Start Date:</span> {new Date(taskDetails.startDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Due Date:</span> {new Date(taskDetails.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      );
    }
    return content;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    // Handle sending new messages if needed
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="p-4 border-b border-neutral-800">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' ? 'bg-blue-600' : 'bg-neutral-800'
              }`}
            >
              {renderMessageContent(message.content)}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        disabled={true}
        placeholder="This is a chat history view"
      />
    </div>
  );
}