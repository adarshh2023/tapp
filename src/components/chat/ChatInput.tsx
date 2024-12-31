import React from 'react';
import { Send, Plus } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className="p-4 border-t border-neutral-800">
      <div className="flex items-center space-x-2 bg-neutral-800 rounded-full p-2">
        <button className="p-2">
          <Plus className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Message here!"
          className="flex-1 bg-transparent outline-none"
        />
        <button 
          onClick={onSend}
          className="p-2 bg-yellow-400 rounded-full"
        >
          <Send className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
}