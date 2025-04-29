import React from 'react';

const SearchFilter = ({ search, setSearch, types, selectedType, setSelectedType }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
