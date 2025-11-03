import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';

// Mock child components to isolate MainPage logic
jest.mock('./SongSearch/SongSearch', () => ({
    SongSearch: ({ searchQuery, onSearchChange }) => (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                data-testid="song-search-input"
                placeholder="Search for a song"
            />
        </div>
    ),
}));

jest.mock('./Filter/Filter', () => ({
    FilterBar: ({ showFilters, onToggleFilters, onLevelToggle, onClearLevels }) => (
        <div>
            <button onClick={onToggleFilters} data-testid="toggle-filters-button">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            {showFilters && (
                <div>
                    <button onClick={() => onLevelToggle(1)} data-testid="level-1-button">
                        Level 1
                    </button>
                    <button onClick={() => onLevelToggle(5)} data-testid="level-5-button">
                        Level 5
                    </button>
                    <button onClick={onClearLevels} data-testid="clear-levels-button">
                        Clear
                    </button>
                </div>
            )}
        </div>
    ),
}));

jest.mock('./SongList/SongList', () => ({
    SongList: ({ selectedLevels, debouncedSearch }) => (
        <div data-testid="song-list">
            <span data-testid="debounced-search-output">{debouncedSearch}</span>
            <span data-testid="selected-levels-output">{Array.from(selectedLevels).join(',')}</span>
        </div>
    ),
}));

// Mock the useDebounce hook to return the value immediately for testing
jest.mock('../hooks/useDebounce', () => ({
    useDebounce: (value) => value,
}));

describe('MainPage', () => {
    test('renders all child components', () => {
        render(<MainPage />);
        expect(screen.getByPlaceholderText('Search for a song')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-filters-button')).toBeInTheDocument();
        expect(screen.getByTestId('song-list')).toBeInTheDocument();
    });

    test('updates search query on input change', () => {
        render(<MainPage />);
        const searchInput = screen.getByTestId('song-search-input');
        fireEvent.change(searchInput, { target: { value: 'New Song' } });
        expect(searchInput.value).toBe('New Song');
        expect(screen.getByTestId('debounced-search-output')).toHaveTextContent('New Song');
    });

    test('toggles level selection', () => {
        render(<MainPage />);
        const LevelFilterButton = screen.getByTestId('level-1-button');

        // Select level
        fireEvent.click(LevelFilterButton);
        expect(screen.getByTestId('selected-levels-output')).toHaveTextContent('1');

        // Deselect level
        fireEvent.click(LevelFilterButton);
        expect(screen.getByTestId('selected-levels-output')).toHaveTextContent('');
    });

    test('clears selected levels', () => {
        render(<MainPage />);
        const level1Button = screen.getByTestId('level-1-button');
        const level5Button = screen.getByTestId('level-5-button');
        const clearButton = screen.getByTestId('clear-levels-button');

        fireEvent.click(level1Button);
        fireEvent.click(level5Button);
        expect(screen.getByTestId('selected-levels-output').textContent).toContain('1');
        expect(screen.getByTestId('selected-levels-output').textContent).toContain('5');

        fireEvent.click(clearButton);
        expect(screen.getByTestId('selected-levels-output')).toHaveTextContent('');
    });

    test('toggles filter visibility', () => {
        render(<MainPage />);
        const toggleButton = screen.getByTestId('toggle-filters-button');

        // Filters are visible by default
        expect(screen.getByTestId('level-1-button')).toBeVisible();

        // Hide filters
        fireEvent.click(toggleButton);
        expect(screen.queryByTestId('level-1-button')).not.toBeInTheDocument();

        // Show filters
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('level-1-button')).toBeVisible();
    });
});