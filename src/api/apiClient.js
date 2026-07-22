import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // <-- Evita la advertencia de ngrok en el navegador
  }, // API Gateway antes localhost 8080
});

export default apiClient;