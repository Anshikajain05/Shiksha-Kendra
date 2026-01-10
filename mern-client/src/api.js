import axios from 'axios';

const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://shiksha-kendra-server.vercel.app"; // Your ACTUAL backend Vercel link

const API = axios.create({ baseURL: API_URL });
export default API;
