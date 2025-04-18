import React from 'react';

interface FiltersProps {
  categories: string[];
  filters: {
    category: string[];
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  filters,
  onFilterChange,
}) => {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    
    onFilterChange({ ...filters, category: newCategories });
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(
              e.target.value ? Number(e.target.value) : null,
              filters.maxPrice
            )}
            className="w-20 px-2 py-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(
              filters.minPrice,
              e.target.value ? Number(e.target.value) : null
            )}
            className="w-20 px-2 py-1 border rounded"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="latest">Latest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters; 