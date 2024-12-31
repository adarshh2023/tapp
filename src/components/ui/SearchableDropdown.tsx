import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Search...'
}: SearchableDropdownProps) => {
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

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center bg-neutral-800 rounded-lg px-4 py-3 cursor-pointer border-2 border-transparent focus-within:border-yellow-400"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          className="bg-transparent text-white flex-grow focus:outline-none"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {search && (
          <X
            className="w-5 h-5 text-gray-400 hover:text-gray-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSearch('');
            }}
          />
        )}
        <ChevronDown className={`w-5 h-5 text-gray-400 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-neutral-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-3 text-white hover:bg-neutral-700 cursor-pointer"
                onClick={() => {
                  onChange(option.value);
                  setSearch('');
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};