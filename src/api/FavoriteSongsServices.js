import { API_URL } from '../config/constants';

const handleRequest = async (url, options, errorMessage, errorValue) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        // For DELETE requests with no content
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return true;
        }
        return await response.json();
    } catch (error) {
        console.error(`${errorMessage}:`, error.message);
        return errorValue;
    }
};

/**
 * Fetches the list of favorite songs.
 * Can be filtered by a list of song IDs.
 * @param {string[]} [songIds] - Optional array of song IDs to fetch favorites for.
 * @returns {Promise<Map<number, number>>} A Map of [songId, favoriteId].
 */
export const fetchFavorites = async (songIds) => {
    let url = `${API_URL}/favorites`;
    if (songIds && songIds.length > 0) {
        const params = new URLSearchParams();
        songIds.forEach((id) => params.append('songId', id));
        url += `?${params.toString()}`;
    }

    const data = await handleRequest(url, {}, 'Failed to fetch favorites', []);
    return new Map(data.map((fav) => [fav.songId, fav.id]));
};

/**
 * Adds a song to favorites.
 * @param {number} songId - The ID of the song to add.
 * @returns {Promise<object | null>} The new favorite object or null on failure.
 */
export const addFavorite = async (songId) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId }),
    };
    return handleRequest(`${API_URL}/favorites`, options, 'Failed to add favorite', null);
};

/**
 * Removes a song from favorites.
 * @param {number} favoriteId - The ID of the favorite entry (not the songId).
 * @returns {Promise<boolean>} True on success, false on failure.
 */
export const removeFavorite = async (favoriteId) => {
    const options = { method: 'DELETE' };
    const result = await handleRequest(`${API_URL}/favorites/${favoriteId}`, options, 'Failed to remove favorite', false);
    return !!result;
};