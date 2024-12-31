import React from 'react';
import { Send, Plus } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  disabled = false,
  placeholder = "Message here!"
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-neutral-800">
      <div className="flex items-center space-x-2 bg-neutral-800 rounded-full p-2">
        <button className="p-2" disabled={disabled}>
          <Plus className={`w-6 h-6 ${disabled ? 'text-gray-600' : 'text-gray-400'}`} />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => !disabled && e.key === 'Enter' && onSend()}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none disabled:text-gray-500"
        />
        <button 
          onClick={onSend}
          disabled={disabled}
          className={`p-2 rounded-full ${
            disabled 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
        >
          <Send className={`w-6 h-6 ${disabled ? 'text-gray-400' : 'text-black'}`} />
        </button>
      </div>
    </div>
  );
}