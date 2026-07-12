// src/api/apiClient.js
export const fetchFromGateway = async (endpoint, token) => {
  const response = await fetch(`http://localhost:8080${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) throw new Error('Error al conectar con el Gateway');
  return response.json();
};