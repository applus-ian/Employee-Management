// apiInstance.js (Axios instance with token validation)
import axios from 'axios';
import Cookies from 'js-cookie';

// Base URL for the API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Token validation function: Verify token on the backend
async function validateToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json();
    return data.isValid || false;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
}

// Create an axios instance with default headers and base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for cross-origin requests
});

// Attach the token to every request if available in cookies
api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token'); // Get token from cookies

    if (token) {
      const isValidToken = await validateToken(token); // Validate token if it exists

      if (isValidToken) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // If token is invalid, remove it from cookies
        Cookies.remove('token');
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
