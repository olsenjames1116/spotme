import axios from 'axios';

// Create an axios object to be used for api calls with presets.
const api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URI || 'http://localhost:8080',
	withCredentials: true,
});

export default api;
