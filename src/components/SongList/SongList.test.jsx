import React from 'react';
import { render, screen } from '@testing-library/react';
import { SongList } from './SongList.jsx';
import { useSongData } from '../../hooks/useSongData';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';


jest.mock('../../hooks/useSongData');
jest.mock('../../hooks/useInfiniteScroll');
jest.mock('../SongItem/SongItem', () => ({
    SongItem: require('react').forwardRef(({ song }, ref) => (
        <li ref={ref} data-testid={`song-item-${song.id}`}>{song.title}</li>
    )),
}));
jest.mock('../common/FullPageLoader', () => ({
    FullPageLoader: () => <div data-testid="full-page-loader">Loading...</div>,
}));
jest.mock('../common/InfiniteLoader', () => ({
    InfiniteLoader: () => <div data-testid="infinite-loader">Loading more...</div>,
}));
jest.mock('../common/CommonSongComponents', () => ({
    NoSongsFound: () => <div data-testid="no-songs-found">No songs found.</div>,
    EndOfList: () => <div data-testid="end-of-list">End of list.</div>,
}));

describe('SongList', () => {
    const mockSetPage = jest.fn();
    const mockHandleToggleFavorite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useInfiniteScroll.mockReturnValue(jest.fn());
    });

    const defaultSongData = {
        songs: [],
        page: 1,
        setPage: mockSetPage,
        totalSongs: 0,
        isLoading: false,
        favorites: new Set(),
        togglingFavoriteId: null,
        handleToggleFavorite: mockHandleToggleFavorite,
        fetchingFavoritesFor: new Set(),
    };

    test('renders FullPageLoader on initial load', () => {
        useSongData.mockReturnValue({
            ...defaultSongData,
            isLoading: true,
            page: 1,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        expect(screen.getByTestId('full-page-loader')).toBeInTheDocument();
    });

    test('renders NoSongsFound when there are no songs after loading', () => {
        useSongData.mockReturnValue({
            ...defaultSongData,
            isLoading: false,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        expect(screen.getByTestId('no-songs-found')).toBeInTheDocument();
    });

    test('renders a list of songs', () => {
        const songs = [
            { id: 1, title: 'Song 1' },
            { id: 2, title: 'Song 2' },
        ];
        useSongData.mockReturnValue({
            ...defaultSongData,
            songs,
            totalSongs: 2,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        expect(screen.getByTestId('song-item-1')).toBeInTheDocument();
        expect(screen.getByText('Song 1')).toBeInTheDocument();
        expect(screen.getByTestId('song-item-2')).toBeInTheDocument();
        expect(screen.getByText('Song 2')).toBeInTheDocument();
    });

    test('renders InfiniteLoader when loading more songs', () => {
        const songs = [{ id: 1, title: 'Song 1' }];
        useSongData.mockReturnValue({
            ...defaultSongData,
            songs,
            totalSongs: 5,
            isLoading: true,
            page: 2,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        expect(screen.getByTestId('infinite-loader')).toBeInTheDocument();
    });

    test('renders EndOfList when all songs are loaded', () => {
        const songs = [{ id: 1, title: 'Song 1' }];
        useSongData.mockReturnValue({
            ...defaultSongData,
            songs,
            totalSongs: 1,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        expect(screen.getByTestId('end-of-list')).toBeInTheDocument();
    });

    test('attaches infinite scroll ref to the last song item', () => {
        const lastSongElementRef = jest.fn();
        useInfiniteScroll.mockReturnValue(lastSongElementRef);
        const songs = [
            { id: 1, title: 'Song 1' },
            { id: 2, title: 'Song 2' },
        ];
        useSongData.mockReturnValue({
            ...defaultSongData,
            songs,
            totalSongs: 3,
        });
        render(<SongList selectedLevels={[]} debouncedSearch="" />);
        const lastSongItem = screen.getByTestId('song-item-2');
        expect(lastSongElementRef).toHaveBeenCalledWith(lastSongItem);
    });
});