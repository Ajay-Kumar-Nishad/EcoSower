import React, { useState } from 'react';
import { TestTube, Upload, Volume2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SoilData } from '../types';

interface SoilHealthProps {
  soilData: SoilData;
  onFeedback: () => void;
}

const SoilHealth: React.FC<SoilHealthProps> = ({ soilData, onFeedback }) => {
  const { t } = useLanguage();
  const [showUpload, setShowUpload] = useState(false);

  const getHealthColor = (value: number, optimal: number) => {
    const diff = Math.abs(value - optimal) / optimal;
    if (diff < 0.1) return 'text-green-600 bg-green-100';
    if (diff < 0.3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const speakRecommendations = () => {
    const text = soilData.recommendations.join('. ');
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('soilHealth')}</h3>
        <TestTube className="h-6 w-6 text-orange-600" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">pH</p>
          <p className={`text-lg font-bold px-2 py-1 rounded ${getHealthColor(soilData.ph, 6.5)}`}>
            {soilData.ph}
          </p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">N</p>
          <p className={`text-lg font-bold px-2 py-1 rounded ${getHealthColor(soilData.nitrogen, 50)}`}>
            {soilData.nitrogen}
          </p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">P</p>
          <p className={`text-lg font-bold px-2 py-1 rounded ${getHealthColor(soilData.phosphorus, 25)}`}>
            {soilData.phosphorus}
          </p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">K</p>
          <p className={`text-lg font-bold px-2 py-1 rounded ${getHealthColor(soilData.potassium, 150)}`}>
            {soilData.potassium}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">{t('recommendations')}</h4>
          <button
            onClick={speakRecommendations}
            className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
            title={t('speakAdvice')}
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        
        {soilData.recommendations.map((recommendation, index) => (
          <div key={index} className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
            <p className="text-sm text-green-800">{recommendation}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setShowUpload(!showUpload)}
        className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Upload className="h-4 w-4" />
        <span>{t('uploadSoilData')}</span>
      </button>
      
      {showUpload && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full mb-3 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            {t('analyzeNow')}
          </button>
        </div>
      )}
      
      <button
        onClick={onFeedback}
        className="w-full mt-4 bg-orange-100 text-orange-700 py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center space-x-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span>{t('feedback')}</span>
      </button>
    </div>
  );
};

export default SoilHealth;