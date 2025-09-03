export interface User {
  id: string;
  mobile: string;
  name?: string;
  location: {
    state: string;
    district: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  preferredLanguage: string;
  cropHistory: string[];
}

export interface Weather {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    description: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    description: string;
    icon: string;
    precipitation: number;
  }>;
}

export interface CropRecommendation {
  cropName: string;
  confidence: number;
  reasons: string[];
  expectedYield: string;
  investmentRequired: string;
  duration: string;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  recommendations: string[];
}

export interface MarketPrice {
  crop: string;
  variety: string;
  market: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export interface PestDetection {
  pestName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  preventionTips: string[];
}

export interface Feedback {
  id: string;
  type: 'crop' | 'soil' | 'pest' | 'weather' | 'market';
  rating: number;
  comment?: string;
  helpful: boolean;
  timestamp: string;
}

export type Language = 'en' | 'hi';
export type Language = 'en' | 'hi' | 'pa';