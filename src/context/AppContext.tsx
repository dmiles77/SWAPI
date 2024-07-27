import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { ISearchResult, ICategoryData } from '../interfaces/interfaces';
import { categories, BaseUrl } from '../interfaces/consts';

interface AppContextType {
    searchResults: Record<string, ISearchResult[]>;
    fetchSearchResults: (query: string) => Promise<void>;
    resetSearchResults: () => void;
    fetchCategoryData: (category: string) => void;
    categoriesData: Record<string, ICategoryData[]>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<Record<string, ISearchResult[]>>({});
    const [categoriesData, setCategoriesData] = useState<Record<string, ICategoryData[]>>({});

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
        <AppContext.Provider value={{ searchResults, fetchSearchResults, resetSearchResults, fetchCategoryData, categoriesData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext must be used within a AppContextProvider');
    }
    return context;
};
