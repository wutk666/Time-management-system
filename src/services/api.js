import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('chronos_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('chronos_token');
            localStorage.removeItem('chronos_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data)
};

// Tasks API
export const tasksAPI = {
    getTasks: (params) => api.get('/tasks', { params }),
    getTask: (id) => api.get(`/tasks/${id}`),
    createTask: (data) => api.post('/tasks', data),
    updateTask: (id, data) => api.put(`/tasks/${id}`, data),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    getStats: () => api.get('/tasks/stats')
};

// Focus API
export const focusAPI = {
    getSessions: (params) => api.get('/focus', { params }),
    createSession: (data) => api.post('/focus', data),
    updateSession: (id, data) => api.put(`/focus/${id}`, data),
    getStats: () => api.get('/focus/stats')
};

// Calendar API
export const calendarAPI = {
    getEvents: (params) => api.get('/calendar', { params }),
    createEvent: (data) => api.post('/calendar', data),
    updateEvent: (id, data) => api.put(`/calendar/${id}`, data),
    deleteEvent: (id) => api.delete(`/calendar/${id}`)
};

export default api;
