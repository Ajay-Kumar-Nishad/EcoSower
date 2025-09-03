import React from 'react';
import { Globe, Menu, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/WhatsApp Image 2025-09-02 at 9.56.42 PM.jpeg" 
              alt="EcoSower Logo" 
              className="h-12 w-12 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-bold">{t('appName')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-white/20 text-white rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
              >
                <option value="en" className="text-gray-800">English</option>
                <option value="hi" className="text-gray-800">हिंदी</option>
                <option value="pa" className="text-gray-800">ਪੰਜਾਬੀ</option>
              </select>
            </div>
            
            <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
            
            <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;