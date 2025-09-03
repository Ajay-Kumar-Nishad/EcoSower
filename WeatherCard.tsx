import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Thermometer, Droplets, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LocationSelector from './LocationSelector';
import { Weather } from '../types';

interface WeatherCardProps {
  weather: Weather;
  onLocationChange: (location: string) => void;
  onFeedback: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onLocationChange, onFeedback }) => {
  const { t } = useLanguage();
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  const getWeatherIcon = (description: string) => {
    if (description.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (description.includes('cloud')) return <Cloud className="h-8 w-8 text-gray-500" />;
    return <Sun className="h-8 w-8 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('weather')}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLocationSelector(true)}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>{weather.location}</span>
          </button>
          {getWeatherIcon(weather.current.description)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-600">{t('temperature')}</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{weather.current.temperature}°C</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600">{t('humidity')}</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{weather.current.humidity}%</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('forecast')}</h4>
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">
                {index === 0 ? t('today') : index === 1 ? t('tomorrow') : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </p>
              {getWeatherIcon(day.description)}
              <p className="text-xs font-medium mt-1">{day.temperature.max}°/{day.temperature.min}°</p>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={onFeedback}
        className="w-full mt-4 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span>{t('feedback')}</span>
      </button>
      
      <LocationSelector
        isOpen={showLocationSelector}
        onClose={() => setShowLocationSelector(false)}
        currentLocation={weather.location}
        onLocationSelect={onLocationChange}
      />
    </div>
  );
};

export default WeatherCard;