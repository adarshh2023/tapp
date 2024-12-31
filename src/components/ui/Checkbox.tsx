import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        {...props}
      />
      <div className="w-6 h-6 border-2 border-yellow-400 rounded-sm">
        <div className={`absolute inset-0 bg-yellow-400 rounded-sm transform scale-0 transition-transform ${props.checked ? 'scale-100' : ''}`} />
      </div>
    </div>
    <span className="text-gray-300">{label}</span>
  </label>
);