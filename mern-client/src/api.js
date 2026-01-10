import axios from 'axios';

// VITE_ prefix is required for Vite to recognize the variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default API;
