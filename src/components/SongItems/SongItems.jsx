// SongItems.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { SONGS_PER_PAGE } from '../../config/constants';
import { SongItem } from '../SongItem/SongItem';
import { addFavorite, removeFavorite, fetchFavorites } from '../../api/FavoriteSongsServices';
import { InfiniteLoader } from '../common/InfiniteLoader';
import { FullPageLoader } from '../common/FullPageLoader';
import { getSongs } from '../../api/SongService';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import './SongItems.css';

const useSongData = ({ debouncedSearch, selectedLevels }) => {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalSongs, setTotalSongs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Map());
    const [togglingFavoriteId, setTogglingFavoriteId] = useState(null);

    useEffect(() => {
        setPage(1);
        setSongs([]);
        setTotalSongs(0);
    }, [debouncedSearch, selectedLevels]);

    useEffect(() => {
        const fetchSongsAndFavorites = async () => {
            setIsLoading(true);
            try {
                const { songs: newSongs, totalCount } = await getSongs({
                    searchTerm: debouncedSearch,
                    levels: Array.from(selectedLevels),
                    start: (page - 1) * SONGS_PER_PAGE,
                    limit: SONGS_PER_PAGE,
                });

                setTotalSongs(totalCount);
                setSongs((prevSongs) => (page === 1 ? newSongs : [...prevSongs, ...newSongs]));

                if (newSongs.length > 0) {
                    const songIds = newSongs.map((s) => s.id);
                    const newFavorites = await fetchFavorites(songIds);
                    setFavorites((prev) => new Map([...(page === 1 ? [] : prev), ...newFavorites]));
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSongsAndFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, debouncedSearch, selectedLevels]);

    const handleToggleFavorite = useCallback(async (songId) => {
        const isFavorite = favorites.has(songId);
        const favoriteId = favorites.get(songId);

        setTogglingFavoriteId(songId);
        try {
            if (isFavorite) {
                const success = await removeFavorite(favoriteId);
                if (success) {
                    setFavorites((prev) => {
                        const newMap = new Map(prev);
                        newMap.delete(songId);
                        return newMap;
                    });
                }
            } else {
                const newFavorite = await addFavorite(songId);
                if (newFavorite) {
                    setFavorites((prev) => new Map(prev).set(newFavorite.songId, newFavorite.id));
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setTogglingFavoriteId(null);
        }
    }, [favorites]);

    return {
        songs,
        page,
        setPage,
        totalSongs,
        isLoading,
        favorites,
        togglingFavoriteId,
        handleToggleFavorite,
    };
};

export const SongItems = ({ selectedLevels, debouncedSearch }) => {
    const {
        songs,
        page,
        setPage,
        totalSongs,
        isLoading,
        favorites,
        togglingFavoriteId,
        handleToggleFavorite,
    } = useSongData({ debouncedSearch, selectedLevels });

    const hasMoreSongs = songs.length < totalSongs;
    const isInitialLoading = isLoading && songs.length === 0 && page === 1;

    const lastSongElementRef = useInfiniteScroll({
        isLoading,
        hasMore: hasMoreSongs,
        onLoadMore: useCallback(() => {
            setPage((prevPage) => prevPage + 1);
        }, [setPage]),
    });

    if (isInitialLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="song-items-container">
            {songs.length > 0 ? (
                <ul>
                    {songs.map((song, index) => {
                        const isLastElement = songs.length === index + 1;
                        return (
                            <SongItem
                                key={song.id}
                                ref={isLastElement ? lastSongElementRef : null}
                                song={song}
                                isFavorite={favorites.has(song.id)}
                                isTogglingFavorite={togglingFavoriteId === song.id}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        );
                    })}
                </ul>
            ) : (
                !isLoading && (
                    <div className="no-songs-container">
                        <h2 className="no-songs-title">No Songs Found</h2>
                        <p>Try adjusting your search or filter settings.</p>
                    </div>
                )
            )}

            {isLoading && !isInitialLoading && <InfiniteLoader />}

            {!hasMoreSongs && songs.length > 0 && (
                <div className="end-of-list-message">
                    You've reached the end of the list.
                </div>
            )}
        </div>
    );
};