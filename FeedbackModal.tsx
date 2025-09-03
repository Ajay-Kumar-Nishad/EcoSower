import React, { useState } from 'react';
import { Star, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'crop' | 'soil' | 'pest' | 'weather' | 'market';
  onSubmit: (feedback: { rating: number; helpful: boolean; comment?: string }) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, type, onSubmit }) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0 && helpful !== null) {
      onSubmit({ rating, helpful, comment: comment.trim() || undefined });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setRating(0);
        setHelpful(null);
        setComment('');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('thankYou')}</h3>
          <p className="text-sm text-gray-600">{t('helpImprove')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{t('feedback')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">{t('wasThisHelpful')}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setHelpful(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  helpful === true 
                    ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{t('yes')}</span>
              </button>
              <button
                onClick={() => setHelpful(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  helpful === false 
                    ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{t('no')}</span>
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">{t('rateAdvice')}</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('addComment')}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Share your thoughts..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || helpful === null}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              rating > 0 && helpful !== null
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('submitFeedback')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;