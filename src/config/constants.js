// --- Configuration ---
// These are application-wide constants.
// Keeping them here makes it easy to change them later.

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3004'; // Your local API endpoint
export const SONGS_PER_PAGE = Number(process.env.REACT_APP_SONGS_PER_PAGE) || 20;
export const DEBOUNCE_DELAY = Number(process.env.REACT_APP_DEBOUNCE_DELAY) || 500;