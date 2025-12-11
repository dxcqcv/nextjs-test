'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

interface Props {
  types: string[];
  totalPages: number;
  currentPage: number;
}

export default function FilterControls({ types, totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentType = searchParams.get('type') || 'all';

  // Update URL helpers
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key === 'type') params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/?${params.toString()}`);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateParams('type', e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    updateParams('page', newPage.toString());
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 p-4 bg-gray-100 rounded-lg">
      
      {/* Type Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="type-select" className="font-semibold text-gray-700">Filter by Type:</label>
        <select 
          id="type-select"
          value={currentType} 
          onChange={handleTypeChange}
          className="p-2 border rounded-md capitalize"
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
        >
          Prev
        </button>
        
        <span className="font-mono text-sm">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}