import React from 'react';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const FilterButton = ({ label, active, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm transition-colors ${
      active ? 'bg-white text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'
    }`}
  >
    {label}
  </button>
);