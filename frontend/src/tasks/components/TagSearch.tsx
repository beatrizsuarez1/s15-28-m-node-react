// src/components/TagSearch.tsx
import { useState, ChangeEvent } from 'react';

interface Tag {
  name: string;
  color: string;
}

const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1).toUpperCase();
};

const tags = [
  {
    name: 'bug',
    color: '#FF0000',
  },
  {
    name: 'front',
    color: '#0000FF',
  },
  {
    name: 'qa',
    color: '#008000',
  },
]

export function TagSearch () {
  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      setFilteredTags(tags);
    } else {
      setFilteredTags(tags.filter(tag => tag.name.includes(value.toLowerCase())));
    }
  };

  const handleTagClick = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearch('');
    setFilteredTags(tags);
  };

  const removeTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="relative w-64">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <div key={tag.name} className={`flex items-center bg-[${lightenColor(tag.color, 50)}] text-[${tag.color}] px-2 py-1 rounded`}>
            <span>{tag.name}</span>
            <button onClick={() => removeTag(tag)} className="ml-1 text-red-500">x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Buscar o crear nuevo"
      />
      {search && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
          {filteredTags.map(tag => (
            <div
              key={tag.name}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {tag.name}
            </div>
          ))}
        </div>
      )}
      <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
        {tags.map(tag => (
          <div
            key={tag.name}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-${tag.color}`}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

