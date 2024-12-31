import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, ...props }: SelectProps) => (
  <div className="space-y-2">
    <label className="text-white text-lg">{label}</label>
    <select
      className="w-full bg-neutral-800 rounded-lg px-4 py-3 text-white border-2 border-transparent focus:border-yellow-400 focus:outline-none"
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);