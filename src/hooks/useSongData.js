import { useState, useEffect, useCallback } from 'react';
import { getSongs } from '../api/SongService';
import { addFavorite, removeFavorite, fetchFavorites } from '../api/FavoriteSongsServices';
import { SONGS_PER_PAGE } from '../config/constants';

export const useSongData = ({ debouncedSearch, selectedLevels }) => {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalSongs, setTotalSongs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Map());
    const [togglingFavoriteId, setTogglingFavoriteId] = useState(null);
    const [fetchingFavoritesFor, setFetchingFavoritesFor] = useState(new Set());

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
                    setFetchingFavoritesFor((prev) => new Set([...prev, ...songIds]));
                    const newFavorites = await fetchFavorites(songIds);
                    setFavorites((prev) => new Map([...(page === 1 ? [] : prev), ...newFavorites]));
                    setFetchingFavoritesFor((prev) => {
                        const newSet = new Set(prev);
                        songIds.forEach((id) => newSet.delete(id));
                        return newSet;
                    });
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
        fetchingFavoritesFor,
    };
};