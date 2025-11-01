// SongList.jsx
import React, { useCallback } from 'react';
import { SongItem } from '../SongItem/SongItem';
import { InfiniteLoader } from '../common/InfiniteLoader';
import { FullPageLoader } from '../common/FullPageLoader';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useSongData } from '../../hooks/useSongData';
import './SongList.css';
import { NoSongsFound, EndOfList } from "../common/CommonSongComponents";

export const SongList = ({ selectedLevels, debouncedSearch }) => {
    const {
        songs,
        page,
        setPage,
        totalSongs,
        isLoading,
        favorites,
        togglingFavoriteId,
        handleToggleFavorite,
        fetchingFavoritesFor,
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

    if (!isLoading && songs.length === 0) {
        return <NoSongsFound />;
    }

    return (
        <div className="song-items-container">
            <ul>
                {songs.map((song, index) => {
                    const isLastElement = songs.length === index + 1;
                    return (
                        <SongItem
                            key={song.id}
                            ref={isLastElement ? lastSongElementRef : null}
                            song={song}
                            isFavorite={favorites.has(song.id)}
                            isTogglingFavorite={togglingFavoriteId === song.id || fetchingFavoritesFor.has(song.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    );
                })}
            </ul>
            {isLoading && <InfiniteLoader />}
            {!hasMoreSongs && songs.length > 0 && <EndOfList />}
        </div>
    );
};