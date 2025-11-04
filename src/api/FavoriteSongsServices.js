import { API_URL } from '../config/constants';

const handleRequest = async (url, options, errorMessage, errorValue, retries = 4, backoff = 300) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                // Only retry on 5xx server errors
                if (response.status >= 500 && response.status < 600) {
                    throw new Error(`Server error: ${response.status}`);
                }
                // For other errors (like 4xx), don't retry
                throw new Error(errorMessage);
            }
            // For DELETE requests with no content
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return true;
            }
            return await response.json();
        } catch (error) {
            console.error(`${errorMessage} (attempt ${i + 1}/${retries}):`, error.message);
            if (i === retries - 1) {
                return errorValue; // Return error value after last attempt
            }
            // Wait before retrying, with increasing delay
            await new Promise(res => setTimeout(res, backoff * (i + 1)));
        }
    }
    return errorValue; // Should be unreachable, but for safety
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