import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const url = `${API_BASE_URL}/all-stories`;

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default API;;
