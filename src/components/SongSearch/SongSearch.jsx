import React from 'react';
import { Search, X } from 'lucide-react';
import './SongSearch.css';

export function SongSearch({ searchQuery, onSearchChange }) {


    const handleInputChange = (event) => {
        const value = event.target.value;
        onSearchChange(value);
    };
    const handleClearSearch = () => {
        onSearchChange('');
    };
    return (
        <div className="song-search-banner">
            <div className="song-search-content">
                <h1 className="song-search-title">
                    NEW SONGS DELIVERED EVERY WEEK
                </h1>
                <p className="song-search-subtitle">
                    Here are the most recent additions to the Yousician App. Start playing
                    today!
                </p>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search for songs..."
                        className="search-input"
                    />
                    {searchQuery && (
                        <X
                            className="search-icon-clear"
                            size={24}
                            onClick={handleClearSearch}
                        />
                    )}
                    <Search
                        className="search-icon"
                        size={24}
                    />
                </div>
            </div>
        </div>
    );
}