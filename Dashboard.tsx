import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import CropAdvisory from './CropAdvisory';
import SoilHealth from './SoilHealth';
import PestDetection from './PestDetection';
import MarketPrices from './MarketPrices';
import VoiceAssistant from './VoiceAssistant';
import FeedbackModal from './FeedbackModal';
import { useLanguage } from '../contexts/LanguageContext';
import { Weather, CropRecommendation, SoilData, MarketPrice, PestDetection as PestDetectionType, Feedback } from '../types';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; type: 'crop' | 'soil' | 'pest' | 'weather' | 'market' | null }>({
    isOpen: false,
    type: null
  });

  // Mock data - in production, this would come from APIs
  const mockWeather: Weather = {
    location: 'Ludhiana, Punjab',
    current: {
      temperature: 28,
      humidity: 75,
      description: 'partly cloudy',
      icon: 'partly-cloudy'
    },
    forecast: [
      { date: '2025-01-10', temperature: { min: 22, max: 30 }, description: 'sunny', icon: 'sunny', precipitation: 0 },
      { date: '2025-01-11', temperature: { min: 20, max: 28 }, description: 'rainy', icon: 'rainy', precipitation: 15 },
      { date: '2025-01-12', temperature: { min: 23, max: 29 }, description: 'cloudy', icon: 'cloudy', precipitation: 5 }
    ]
  };

  const mockCropRecommendations: CropRecommendation[] = [
    {
      cropName: 'Rice (धान)',
      confidence: 92,
      reasons: ['High soil moisture', 'Upcoming monsoon', 'Market demand'],
      expectedYield: '45-50 quintal/hectare',
      investmentRequired: '₹25,000-30,000',
      duration: '120-130 days'
    },
    {
      cropName: 'Maize (मक्का)',
      confidence: 85,
      reasons: ['Good soil pH', 'Temperature suitable', 'Local market'],
      expectedYield: '60-65 quintal/hectare',
      investmentRequired: '₹20,000-25,000',
      duration: '90-100 days'
    }
  ];

  const mockSoilData: SoilData = {
    ph: 6.8,
    nitrogen: 45,
    phosphorus: 22,
    potassium: 180,
    organicMatter: 2.1,
    recommendations: [
      'Apply 10kg DAP per acre for phosphorus boost',
      'Add organic compost to improve soil structure',
      'Consider lime application to maintain pH balance',
      'Zinc sulfate application recommended for micronutrient balance'
    ]
  };

  const mockMarketPrices: MarketPrice[] = [
    { crop: 'Wheat', variety: 'PBW-343', market: 'Ludhiana Mandi', price: 2150, unit: 'quintal', date: '2025-01-10', trend: 'up' },
    { crop: 'Rice', variety: 'Basmati', market: 'Karnal Mandi', price: 4200, unit: 'quintal', date: '2025-01-10', trend: 'stable' },
    { crop: 'Maize', variety: 'Hybrid', market: 'Hisar Mandi', price: 1850, unit: 'quintal', date: '2025-01-10', trend: 'down' },
    { crop: 'Cotton', variety: 'Bt Cotton', market: 'Sirsa Mandi', price: 6800, unit: 'quintal', date: '2025-01-10', trend: 'up' }
  ];

  const mockPestDetection: PestDetectionType[] = [
    {
      pestName: 'Brown Plant Hopper',
      confidence: 89,
      severity: 'medium',
      treatment: [
        'Spray Neem oil solution (50ml/liter)',
        'Use yellow sticky traps',
        'Apply recommended insecticide after 3 days'
      ],
      preventionTips: [
        'Maintain proper plant spacing',
        'Avoid excessive nitrogen fertilization',
        'Regular field monitoring'
      ]
    }
  ];

  const handleFeedbackSubmit = (feedback: { rating: number; helpful: boolean; comment?: string }) => {
    // In production, this would send feedback to your backend
    console.log('Feedback submitted:', {
      type: feedbackModal.type,
      ...feedback,
      timestamp: new Date().toISOString()
    });
  };

  const openFeedback = (type: 'crop' | 'soil' | 'pest' | 'weather' | 'market') => {
    setFeedbackModal({ isOpen: true, type });
  };

  const closeFeedback = () => {
    setFeedbackModal({ isOpen: false, type: null });
  };

  const handleLocationChange = (location: string) => {
    // In production, this would fetch new weather data for the selected location
    console.log('Location changed to:', location);
    // For now, we'll just update the location in the weather data
    // In a real app, you'd make an API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('dashboard')}</h2>
          <p className="text-gray-600">Personalized recommendations for your farm</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <WeatherCard 
              weather={mockWeather} 
              onLocationChange={handleLocationChange}
              onFeedback={() => openFeedback('weather')} 
            />
            <VoiceAssistant />
          </div>
          
          {/* Middle Column */}
          <div className="space-y-6">
            <CropAdvisory recommendations={mockCropRecommendations} onFeedback={() => openFeedback('crop')} />
            <SoilHealth soilData={mockSoilData} onFeedback={() => openFeedback('soil')} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <MarketPrices prices={mockMarketPrices} onFeedback={() => openFeedback('market')} />
            <PestDetection detectedPests={mockPestDetection} onFeedback={() => openFeedback('pest')} />
          </div>
        </div>
        
        <FeedbackModal
          isOpen={feedbackModal.isOpen}
          onClose={closeFeedback}
          type={feedbackModal.type!}
          onSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
};

export default Dashboard;