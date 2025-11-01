import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SongItem } from './SongItem';

// Mock child components to isolate the SongItem component in tests
jest.mock('../common/LevelIndicator', () => ({
    LevelIndicator: ({ level }) => <div data-testid="level-indicator">Level: {level}</div>,
}));

jest.mock('../common/FavoriteButton', () => ({
    FavoriteButton: ({ isFavorite, onClick, disabled }) => (
        <button onClick={onClick} disabled={disabled} data-testid="favorite-button">
            {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
    ),
}));

describe('SongItem', () => {
    const mockSong = {
        id: 1,
        title: 'Test Song',
        artist: 'Test Artist',
        level: 5,
        image: 'test-image.jpg',
    };

    const mockOnToggleFavorite = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders song details correctly', () => {
        render(<SongItem song={mockSong} />);
        expect(screen.getByText('Test Song')).toBeInTheDocument();
        expect(screen.getByText('Test Artist')).toBeInTheDocument();
        expect(screen.getByAltText('Test Song artwork')).toBeInTheDocument();
        expect(screen.getByTestId('level-indicator')).toHaveTextContent('Level: 5');
    });

    test('renders song image when provided', () => {
        render(<SongItem song={mockSong} />);
        const image = screen.getByAltText('Test Song artwork');
        expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    test('renders default image when song image is not provided', () => {
        const songWithoutImage = { ...mockSong, image: null };
        render(<SongItem song={songWithoutImage} />);
        const image = screen.getByAltText('Test Song artwork');
        // CRA's Jest setup mocks static file imports to return the filename.
        expect(image.src).toContain('SongItem_2.png');
    });

    test('calls onToggleFavorite with song id when favorite button is clicked', () => {
        render(<SongItem song={mockSong} onToggleFavorite={mockOnToggleFavorite} />);
        const favoriteButton = screen.getByTestId('favorite-button');
        fireEvent.click(favoriteButton);
        expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockSong.id);
        expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    });

    test('disables favorite button when isTogglingFavorite is true', () => {
        render(<SongItem song={mockSong} onToggleFavorite={mockOnToggleFavorite} isTogglingFavorite={true} />);
        const favoriteButton = screen.getByTestId('favorite-button');
        expect(favoriteButton).toBeDisabled();
    });

    test('applies "filtered" class when isFiltered is true', () => {
        const { container } = render(<SongItem song={mockSong} isFiltered={true} />);
        expect(container.firstChild).toHaveClass('filtered');
    });

    test('applies "toggling-favorite" class when isTogglingFavorite is true', () => {
        const { container } = render(<SongItem song={mockSong} isTogglingFavorite={true} />);
        expect(container.firstChild).toHaveClass('toggling-favorite');
    });

    test('passes isFavorite prop to FavoriteButton', () => {
        const { rerender } = render(<SongItem song={mockSong} isFavorite={true} />);
        expect(screen.getByTestId('favorite-button')).toHaveTextContent('Favorited');

        rerender(<SongItem song={mockSong} isFavorite={false} />);
        expect(screen.getByTestId('favorite-button')).toHaveTextContent('Favorite');
    });

    test('forwards ref to the li element', () => {
        const ref = React.createRef();
        render(<SongItem song={mockSong} ref={ref} />);
        expect(ref.current.tagName).toBe('LI');
    });
});