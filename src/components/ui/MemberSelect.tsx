import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { User } from '../../types/user';

interface MemberSelectProps {
  user: User;
  selected: boolean;
  role: string;
  onSelect: (selected: boolean) => void;
  onRoleChange: (role: string) => void;
}

export const MemberSelect = ({
  user,
  selected,
  role,
  onSelect,
  onRoleChange,
}: MemberSelectProps) => (
  <div className="flex items-center space-x-4 p-4 bg-neutral-800 rounded-lg">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="peer h-5 w-5 appearance-none rounded border-2 border-yellow-400 bg-transparent"
      />
      <Check className="absolute h-4 w-4 text-yellow-400 opacity-0 peer-checked:opacity-100" />
    </div>
    
    <span className="text-white flex-grow font-medium">{user.name}</span>
    
    {selected && (
      <div className="relative">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="appearance-none bg-neutral-700 text-white rounded-lg px-4 py-2 pr-10 border-2 border-transparent focus:border-yellow-400 focus:outline-none"
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="owner">Owner</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    )}
  </div>
);