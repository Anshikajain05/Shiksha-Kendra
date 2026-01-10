import axios from 'axios';

// Check where the app is running
const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://shiksha-kendra-server.vercel.app";

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true 
});

export default API;
