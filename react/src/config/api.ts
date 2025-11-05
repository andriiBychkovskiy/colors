// API Configuration
// In development: use localhost:3000
// In production: use Render backend URL

const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment 
  ? "http://localhost:3000" 
  : "https://kidscolors.onrender.com"; // Production Render URL

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  IMAGES: `${API_BASE_URL}/images`,
  PALETTES: `${API_BASE_URL}/palettes`,
  PROGRESS: `${API_BASE_URL}/progress`,
};
