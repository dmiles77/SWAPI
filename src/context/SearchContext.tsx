import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

export interface ISearchResult {
    category: string;
    name: string;
    url: string;
}

interface SearchContextType {
    searchResults: Record<string, ISearchResult[]>;
    fetchSearchResults: (query: string) => Promise<void>;
    resetSearchResults: () => void;
    fetchCategoryData: (category: string) => void;
    categoriesData: Record<string, ISearchResult[]>;
}

const BaseUrl = 'https://swapi.dev/api';
const categories = ['people', 'planets', 'films', 'starships', 'vehicles'];

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<Record<string, ISearchResult[]>>({});
    const [categoriesData, setCategoriesData] = useState<Record<string, ISearchResult[]>>({});

    const fetchSearchResults = useCallback(async (query: string) => {
        const results: Record<string, ISearchResult[]> = {};

        await Promise.all(categories.map(async (category) => {
            const response = await axios.get(`${BaseUrl}/${category}?search=${query}`);
            results[category] = response.data.results.slice(0, 3).map((item: any) => ({
                name: item.name || item.title,
                url: item.url,
            }));
        }));

        setSearchResults(results);
    }, []);

    const fetchCategoryData = async (category: string) => {
        if (!categoriesData[category]) {
            const response = await axios.get(`${BaseUrl}/${category}`);
            setCategoriesData({ ...categoriesData, [category]: response.data.results });
        }
    };

    const resetSearchResults = () => {
        setSearchResults({});
    }

    return (
        <SearchContext.Provider value={{ searchResults, fetchSearchResults, resetSearchResults, fetchCategoryData, categoriesData }}>
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
