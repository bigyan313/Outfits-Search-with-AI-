import { WeatherData } from '../types';

export const getWeatherForecast = async (destination: string, date: string): Promise<WeatherData> => {
  try {
    // Mock weather data for demonstration
    const weatherData: WeatherData = {
      date,
      destination,
      temperature: 22,
      conditions: 'Sunny',
      humidity: 45,
      windSpeed: 10,
      precipitation: 0,
      warning: null
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather forecast');
  }
};