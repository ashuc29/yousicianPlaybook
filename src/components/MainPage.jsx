import React, { useState } from 'react';
import './MainPage.css';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../config/constants';
import { SongSearch } from './SongSearch/SongSearch';
import { FilterBar } from './Filter/Filter';
import { SongItems } from './SongItems/SongItems.jsx';

export function MainPage() {
    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevels, setSelectedLevels] = useState(new Set());
    const [showFilters, setShowFilters] = useState(true);

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

    return (
        <div className="main-page-container">
            <SongSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <FilterBar
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters((s) => !s)}
                selectedLevels={selectedLevels}
                onLevelToggle={handleLevelToggle}
            />
            <SongItems
                selectedLevels={selectedLevels}
                debouncedSearch={debouncedSearch}
            />
        </div>
    );
}

