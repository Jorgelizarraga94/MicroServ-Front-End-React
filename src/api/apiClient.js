import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://blizzardly-bailee-unnotified.ngrok-free.dev ', // API Gateway antes localhost 8080
});

export default apiClient;