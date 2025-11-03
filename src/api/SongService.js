import { API_URL } from '../config/constants';
/**
 * A helper function to handle API responses.
 * It checks if the response was ok, and if so, returns the json.
 * Otherwise, it throws an error.
 */
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} ${error}`);
    }
    return response.json();
}

/**
 * Fetches the list of songs.
 * This function will use ALL the parameters from the docs:
 * - search_like (for search)
 * - level (for filtering)
 * - _start and _limit (for infinite scroll)
 */
export async function getSongs(options = {}) {
    // 1. Get all the options. We set defaults for pagination.
    const { searchTerm, levels, start = 0, limit = 10 } = options;

    // 2. Use URLSearchParams to build the query string.
    // This is a safe way to add parameters.
    const params = new URLSearchParams();
    params.append('_start', start);
    params.append('_limit', limit);

    if (searchTerm) {
        params.append('q', searchTerm);
    }

    // The API docs show: GET /songs?level=1&level=2
    if (levels && levels.length > 0) {
        levels.forEach(level => {
            params.append('level', level);
        });
    }

    // 3. Make the fetch call
    const url = `${API_URL}/songs?${params.toString()}`;
    console.log("Making API Request:", url); // Good for debugging

    const response = await fetch(url);

    // 4. IMPORTANT: We need the 'X-Total-Count' header for infinite scroll
    // This tells us how many total songs there are
    const totalCount = response.headers.get('X-Total-Count');
    const data = await handleResponse(response);

    // 5. Return the songs AND the total count
    return {
        songs: data,
        totalCount: parseInt(totalCount, 10) || 0
    };
}
