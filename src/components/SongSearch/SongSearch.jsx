import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SongSearch.css';

export function SongSearch({ onSearchChange }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        onSearchChange(value);
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
                    <Search
                        className="search-icon"
                        size={24}
                    />
                </div>
            </div>
        </div>
    );
}