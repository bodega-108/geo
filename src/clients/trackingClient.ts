const API_BASE_URL = 'https://my-bus-api-stage.up.railway.app';

export interface Location {
  // Definir la interfaz según la respuesta de la API
  // Se puede expandir cuando se conozca la estructura exacta
  [key: string]: any;
}

export const trackingClient = {
  async getLocations(): Promise<Location[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tracking/locations`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }
};
