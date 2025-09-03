import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MarketPrice } from '../types';

interface MarketPricesProps {
  prices: MarketPrice[];
  onFeedback: () => void;
}

const MarketPrices: React.FC<MarketPricesProps> = ({ prices, onFeedback }) => {
  const { t } = useLanguage();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('marketPrices')}</h3>
        <div className="flex items-center space-x-1 text-green-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{t('nearbyMarkets')}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {prices.map((price, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{price.crop}</h4>
              <p className="text-sm text-gray-600">{price.variety} • {price.market}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-800">
                  ₹{price.price.toLocaleString()}/{price.unit}
                </span>
                <div className={`flex items-center ${getTrendColor(price.trend)}`}>
                  {getTrendIcon(price.trend)}
                </div>
              </div>
              <p className="text-xs text-gray-500">{new Date(price.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Tip: Prices shown are from the nearest mandis. Check multiple markets before selling.
        </p>
      </div>
      
      <button
        onClick={onFeedback}
        className="w-full mt-4 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span>{t('feedback')}</span>
      </button>
    </div>
  );
};

export default MarketPrices;