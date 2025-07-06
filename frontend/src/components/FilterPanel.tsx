import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { FilterOptions } from '../types/product';

interface FilterPanelProps {
  onFilter: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  appliedFilters?: FilterOptions;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter, onClearFilters, isLoading = false, appliedFilters = {} }) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    const newFilters = {
      ...filters,
      [key]: numValue
    };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.values(appliedFilters).some(val => val !== undefined && val !== '');

  return (
    <div className="bg-white border-b border-gray-200 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 md:gap-12">
            {/* Price Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-avenir font-normal text-gray-700 min-w-[60px]">
                Price
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-avenir focus:outline-none focus:border-gray-500 transition-colors appearance-none"
                />
                <span className="text-gray-400 text-sm">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-avenir focus:outline-none focus:border-gray-500 transition-colors appearance-none"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-avenir font-normal text-gray-700 min-w-[60px]">
                Rating
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Min"
                  value={filters.minPopularity || ''}
                  onChange={(e) => handleFilterChange('minPopularity', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-avenir focus:outline-none focus:border-gray-500 transition-colors appearance-none"
                />
                <span className="text-gray-400 text-sm">—</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Max"
                  value={filters.maxPopularity || ''}
                  onChange={(e) => handleFilterChange('maxPopularity', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-avenir focus:outline-none focus:border-gray-500 transition-colors appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="flex-1 sm:flex-none px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-avenir font-normal"
            >
              {isLoading ? 'Filtering...' : 'Apply'}
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-all border border-gray-200"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-avenir font-normal">Clear Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 