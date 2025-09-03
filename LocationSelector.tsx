import React, { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onLocationSelect: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onLocationSelect 
}) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Major agricultural cities/districts in India
  const locations = [
    'Ludhiana, Punjab',
    'Karnal, Haryana',
    'Hisar, Haryana',
    'Sirsa, Haryana',
    'Amritsar, Punjab',
    'Bathinda, Punjab',
    'Moga, Punjab',
    'Sangrur, Punjab',
    'Panipat, Haryana',
    'Rohtak, Haryana',
    'Sonipat, Haryana',
    'Kaithal, Haryana',
    'Kurukshetra, Haryana',
    'Yamunanagar, Haryana',
    'Ambala, Haryana',
    'Patiala, Punjab',
    'Faridkot, Punjab',
    'Firozpur, Punjab',
    'Gurdaspur, Punjab',
    'Hoshiarpur, Punjab',
    'Jalandhar, Punjab',
    'Kapurthala, Punjab',
    'Mansa, Punjab',
    'Muktsar, Punjab',
    'Nawanshahr, Punjab',
    'Rupnagar, Punjab',
    'Tarn Taran, Punjab'
  ];

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{t('selectLocation')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <button
            onClick={() => handleLocationSelect(currentLocation)}
            className="w-full text-left p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4 text-green-600" />
            <div>
              <p className="font-medium text-green-800">{t('currentLocation')}</p>
              <p className="text-sm text-green-600">{currentLocation}</p>
            </div>
          </button>
          
          {filteredLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{location}</span>
            </button>
          ))}
        </div>
        
        {filteredLocations.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No locations found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;