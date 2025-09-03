import React, { useState } from 'react';
import { Bug, Camera, Upload, AlertTriangle, Volume2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PestDetection as PestDetectionType } from '../types';

interface PestDetectionProps {
  detectedPests: PestDetectionType[];
  onFeedback: () => void;
}

const PestDetection: React.FC<PestDetectionProps> = ({ detectedPests, onFeedback }) => {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setIsAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => setIsAnalyzing(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const speakTreatment = (treatment: string[]) => {
    const text = treatment.join('. ');
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('pestDetection')}</h3>
        <Bug className="h-6 w-6 text-red-600" />
      </div>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="pest-image-upload"
          />
          <label htmlFor="pest-image-upload" className="cursor-pointer">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{t('uploadImage')}</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
          </label>
        </div>
        
        {uploadedImage && (
          <div className="mt-4">
            <img src={uploadedImage} alt="Uploaded crop" className="w-full h-48 object-cover rounded-lg" />
            {isAnalyzing && (
              <div className="mt-2 flex items-center justify-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Analyzing image...</span>
              </div>
            )}
          </div>
        )}
        
        {!isAnalyzing && detectedPests.length > 0 && (
          <div className="space-y-3">
            {detectedPests.map((pest, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{pest.pestName}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(pest.severity)}`}>
                      {pest.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">{pest.confidence}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">{t('treatment')}:</p>
                      <button
                        onClick={() => speakTreatment(pest.treatment)}
                        className="bg-blue-100 text-blue-600 p-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                    </div>
                    <ul className="text-sm text-gray-600 ml-4">
                      {pest.treatment.map((step, idx) => (
                        <li key={idx} className="list-disc">{step}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t('prevention')}:</p>
                    <ul className="text-sm text-gray-600 ml-4">
                      {pest.preventionTips.map((tip, idx) => (
                        <li key={idx} className="list-disc">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {detectedPests.length === 0 && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Upload a crop image to detect pests and diseases</p>
          </div>
        )}
        
        <button
          onClick={onFeedback}
          className="w-full mt-4 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{t('feedback')}</span>
        </button>
      </div>
    </div>
  );
};

export default PestDetection;