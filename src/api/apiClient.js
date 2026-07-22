import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // API Gateway antes localhost 8080
});

export default apiClient;