import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

export interface SearchResult {
    category: string;
    name: string;
    url: string;
}

interface SearchContextType {
  searchResults: Record<string, SearchResult[]>;
  fetchSearchResults: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Record<string, SearchResult[]>>({});

  const fetchSearchResults = useCallback(async (query: string) => {
    const categories = ['people', 'planets', 'films', 'starships', 'vehicles'];
    const results: Record<string, SearchResult[]> = {};

    await Promise.all(categories.map(async (category) => {
      const response = await axios.get(`https://swapi.dev/api/${category}?search=${query}`);
      results[category] = response.data.results.slice(0, 3).map((item: any) => ({
        name: item.name || item.title,
        url: item.url,
      }));
    }));

    setSearchResults(results);
  }, []);

  return (
    <SearchContext.Provider value={{ searchResults, fetchSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
