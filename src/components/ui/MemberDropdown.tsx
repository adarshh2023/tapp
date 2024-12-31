import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, UserPlus } from 'lucide-react';
import { User } from '../../types/user';

interface Member {
  userId: string;
  role: string;
}

interface MemberDropdownProps {
  label: string;
  users: User[];
  selectedMembers: Member[];
  onChange: (members: Member[]) => void;
}

export const MemberDropdown = ({
  label,
  users,
  selectedMembers,
  onChange
}: MemberDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleMemberSelect = (user: User) => {
    const existingMember = selectedMembers.find(m => m.userId === user._id);
    if (existingMember) {
      onChange(selectedMembers.filter(m => m.userId !== user._id));
    } else {
      onChange([...selectedMembers, { userId: user._id, role: 'viewer' }]);
    }
  };

  const handleRoleChange = (userId: string, role: string) => {
    onChange(
      selectedMembers.map(member =>
        member.userId === userId ? { ...member, role } : member
      )
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-white text-lg">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center bg-neutral-800 rounded-lg px-4 py-3 cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserPlus className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            className="bg-transparent text-white flex-grow focus:outline-none"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-neutral-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredUsers.map((user) => {
              const isSelected = selectedMembers.some(m => m.userId === user._id);
              const memberRole = selectedMembers.find(m => m.userId === user._id)?.role;

              return (
                <div
                  key={user._id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-neutral-700"
                >
                  <div
                    className="flex-grow cursor-pointer"
                    onClick={() => handleMemberSelect(user)}
                  >
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                  
                  {isSelected && (
                    <select
                      value={memberRole}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-neutral-700 text-white rounded px-2 py-1 text-sm border-2 border-transparent focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="owner">Owner</option>
                    </select>
                  )}
                </div>
              );
            })}
            {filteredUsers.length === 0 && (
              <div className="px-4 py-3 text-gray-400">No members found</div>
            )}
          </div>
        )}
      </div>

      {selectedMembers.length > 0 && (
        <div className="mt-2 space-y-2">
          {selectedMembers.map((member) => {
            const user = users.find(u => u._id === member.userId);
            if (!user) return null;

            return (
              <div
                key={member.userId}
                className="flex items-center justify-between bg-neutral-700 rounded-lg px-4 py-2"
              >
                <div>
                  <div className="text-white font-medium">{user.name}</div>
                  <div className="text-gray-400 text-sm">{member.role}</div>
                </div>
                <button
                  onClick={() => handleMemberSelect(user)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};