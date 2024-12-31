import React from 'react';

type Filter = 'All' | 'Assigned to me' | 'Due Today' | 'Upcoming';

interface TaskFiltersProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export const TaskFilters = ({ activeFilter, onFilterChange }: TaskFiltersProps) => {
  const filters: Filter[] = ['All', 'Assigned to me', 'Due Today', 'Upcoming'];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            activeFilter === filter
              ? 'bg-yellow-400 text-black'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};