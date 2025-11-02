import React, { useState } from 'react';
import './MainPage.css';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../config/constants';
import { SongSearch } from './SongSearch/SongSearch';
import { FilterBar } from './Filter/Filter';
import { SongList } from "./SongList/SongList";

export function MainPage() {
    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevels, setSelectedLevels] = useState(new Set());
    const [showFilters, setShowFilters] = useState(true);
    const [theme, setTheme] = useState('dark');

    // --- Debounced Search ---
    const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_DELAY);

    // --- Event Handlers ---
    const handleLevelToggle = (level) => {
        setSelectedLevels((prevLevels) => {
            const newLevels = new Set(prevLevels);
            if (newLevels.has(level)) {
                newLevels.delete(level);
            } else {
                newLevels.add(level);
            }
            return newLevels;
        });
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="main-page-container" data-theme={theme}>
            <SongSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <FilterBar
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters((s) => !s)}
                selectedLevels={selectedLevels}
                onLevelToggle={handleLevelToggle}
            />
            <SongList
                selectedLevels={selectedLevels}
                debouncedSearch={debouncedSearch}
            />
            <button onClick={toggleTheme} className="theme-toggle-button">
                Toggle Theme
            </button>
        </div>
    );
}

