import axios from 'axios';

// This detects if you are on your laptop or on Vercel
const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://shiksha-kendra-server.vercel.app"; // Use your main project URL here

const API = axios.create({
    baseURL: API_URL,
});

export default API;
