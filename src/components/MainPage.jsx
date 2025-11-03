import React, { useState } from 'react';
import './MainPage.css'; // Re-import the CSS file
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../config/constants';
import { SongSearch } from './SongSearch/SongSearch';
import { FilterBar } from './Filter/Filter';
import { SongList } from './SongList/SongList';
import { Sun, Moon } from 'lucide-react';


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
    const handleClearLevels = () => {
        setSelectedLevels(new Set());
    }

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`main-page-container ${theme}`}>
            <div className="header">
                <SongSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <button onClick={toggleTheme} className="theme-toggle-button">
                    {theme === 'dark' ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>
            </div>
            <FilterBar
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters((s) => !s)}
                selectedLevels={selectedLevels}
                onLevelToggle={handleLevelToggle}
                onClearLevels={handleClearLevels}
            />
            <SongList
                selectedLevels={selectedLevels}
                debouncedSearch={debouncedSearch}
            />
        </div>
    );
}

