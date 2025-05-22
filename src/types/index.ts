export interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  description: string;
  icon: string;
  details: {
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    precipitation?: number;
  };
}

export interface OutfitDescription {
  top: string;
  outer?: string;
  bottom: string;
  shoes: string;
  accessories: string[];
}

export interface OutfitItem {
  id: string;
  type: string;
  description: OutfitDescription;
  searchQuery: string;
  imagePrompt?: string;
  products?: Product[];
}

export interface Product {
  id?: string;
  title: string;
  link: string;
  image: string;
  price: string;
  store: string;
  description?: string;
  category?: string;
  savedAt?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface TravelPlan {
  id: string;
  destination?: string;
  date?: string;
  event?: string;
  weather?: WeatherData;
  outfits?: OutfitItem[];
  status: 'idle' | 'loading' | 'success' | 'error' | 'warning';
  error?: string;
  warning?: string;
  type: 'travel' | 'event' | 'error';
}