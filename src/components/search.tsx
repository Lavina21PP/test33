'use client';

import { useState } from 'react';
import { iconSearch } from '@/func/googleicon';

export default function SearchBar({ onSearch }: { onSearch: (data: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-2 relative">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border !px-3 !py-[0.6rem] rounded-[25px] w-full bg-[#f1f1f1]"
      />
      <button type="submit" className="rounded-md absolute right-4">
      {iconSearch()}
      </button>
    </form>
  );
}
