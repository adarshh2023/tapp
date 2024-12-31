import React, { useState, useRef, useEffect } from 'react';
import { Activity, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface StatusDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export const StatusDropdown = ({
  label,
  value,
  onChange,
  options
}: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="space-y-2">
      <label className="text-white text-lg">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center bg-neutral-800 rounded-lg px-4 py-3 cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Activity className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-white flex-grow">
            {selectedOption?.label}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  option.value === value
                    ? 'bg-neutral-700 text-yellow-400'
                    : 'text-white hover:bg-neutral-700'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};