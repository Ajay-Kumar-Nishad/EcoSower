import React from 'react';
import { Wheat, TrendingUp, Clock, IndianRupee, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CropRecommendation } from '../types';

interface CropAdvisoryProps {
  recommendations: CropRecommendation[];
  onFeedback: () => void;
}

const CropAdvisory: React.FC<CropAdvisoryProps> = ({ recommendations, onFeedback }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('cropAdvisory')}</h3>
        <Wheat className="h-6 w-6 text-green-600" />
      </div>
      
      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{crop.cropName}</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {crop.confidence}% {t('confidence')}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-gray-600">{t('expectedYield')}</p>
                  <p className="font-medium">{crop.expectedYield}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <IndianRupee className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-gray-600">{t('investment')}</p>
                  <p className="font-medium">{crop.investmentRequired}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-gray-600">{t('duration')}</p>
                  <p className="font-medium">{crop.duration}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-gray-600 mb-1">Key Reasons:</p>
              <div className="flex flex-wrap gap-1">
                {crop.reasons.map((reason, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={onFeedback}
        className="w-full mt-4 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span>{t('feedback')}</span>
      </button>
    </div>
  );
};

export default CropAdvisory;