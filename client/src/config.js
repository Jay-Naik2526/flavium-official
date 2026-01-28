// src/config.js

// 1. This checks if you are running online (Vercel) or locally
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// 2. We export these "smart" URLs for the other pages to use
export const SOCKET_URL = API_BASE_URL;
export const API_URL = `${API_BASE_URL}/api/matches`;
export const ADMIN_AUTH_URL = `${API_BASE_URL}/api/admin/login`;
export const VOTE_URL = (id) => `${API_BASE_URL}/api/matches/${id}/vote`;