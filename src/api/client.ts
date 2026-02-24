import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = "access_token";

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuthenticatedInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add accessToken to HEADER-AUTHORIZATION
const setAuthHeader = (token: string | null) => {
    if (token) {
        axiosAuthenticatedInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosAuthenticatedInstance.defaults.headers.common['Authorization'];
    }
};

// Set Token
export const setTokens = async (token: string) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    setAuthHeader(token);
};

// Fetch Token
export const getStoredTokens = async () => ({
    accessToken: localStorage.getItem(ACCESS_TOKEN),
});

// Clear Token
export const clearTokens = async () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('user');
    setAuthHeader(null);
};

// Initialize auth header from stored token
export const initializeAuth = async () => {
    try {
        const storedToken = localStorage.getItem(ACCESS_TOKEN);
        if (storedToken) {
            setAuthHeader(storedToken);
        }
    } catch (error) {
        console.error('Failed to initialize auth:', error);
    }
};

// Response interceptor to return data directly and handle errors
axiosAuthenticatedInstance.interceptors.request.use(
    (config) => {
        // Remove Content-Type header for FormData to allow browser to set it with boundary
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosAuthenticatedInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            clearTokens();
            // Avoid redirecting if we are already on login page to prevent loops
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);
