import { createContext, useState } from 'react';
import { ContainerProps } from './types';

type SearchType = {
    results: string[],
    collection: string,
}

type SearchContextType = {
    search: SearchType,
    setSearch: React.Dispatch<React.SetStateAction<SearchType>>
}

const initialSearchValues: SearchType = {
    results: [],
    collection: '',
}

export const SearchContext = createContext<SearchContextType>({
    search: { results: [], collection: '' },
    setSearch: () => console.warn('not initialised yet'),
});

export const SearchProvider = ({ children }: ContainerProps) => {
    const [search, setSearch] = useState<SearchType>(initialSearchValues);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};