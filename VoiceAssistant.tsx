import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VoiceAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'hi-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        processVoiceCommand(transcript);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const processVoiceCommand = (command: string) => {
    // Mock AI processing
    let mockResponse = '';
    
    if (command.toLowerCase().includes('weather') || command.includes('मौसम')) {
      mockResponse = 'आज का मौसम साफ है, तापमान 28°C है। कल बारिश की संभावना है।';
    } else if (command.toLowerCase().includes('crop') || command.includes('फसल')) {
      mockResponse = 'इस मौसम में आपके लिए धान और मक्का की फसल सबसे अच्छी है।';
    } else if (command.toLowerCase().includes('price') || command.includes('भाव')) {
      mockResponse = 'आज गेहूं का भाव ₹2,100 प्रति क्विंटल है। कल से दाम बढ़ने की संभावना है।';
    } else {
      mockResponse = 'मैं आपकी मदद कर सकता हूँ। मौसम, फसल, या बाज़ार भाव के बारे में पूछें।';
    }
    
    setResponse(mockResponse);
    
    // Speak the response
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(mockResponse);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('voiceAssistant')}</h3>
        <MessageCircle className="h-6 w-6 text-blue-600" />
      </div>
      
      <div className="text-center space-y-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
          }`}
        >
          {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </button>
        
        <p className="text-sm text-gray-600">
          {isListening ? t('listening') : t('tapToSpeak')}
        </p>
        
        {transcript && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700 font-medium">You said:</p>
            <p className="text-sm text-gray-600 italic">"{transcript}"</p>
          </div>
        )}
        
        {response && (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-green-800 font-medium mb-1">AI Response:</p>
                <p className="text-sm text-green-700">{response}</p>
              </div>
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(response);
                    utterance.lang = 'hi-IN';
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors ml-2"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          onClick={() => processVoiceCommand('weather')}
          className="bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm hover:bg-blue-200 transition-colors"
        >
          मौसम जानकारी
        </button>
        <button
          onClick={() => processVoiceCommand('crop')}
          className="bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm hover:bg-green-200 transition-colors"
        >
          फसल सुझाव
        </button>
        <button
          onClick={() => processVoiceCommand('price')}
          className="bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm hover:bg-orange-200 transition-colors"
        >
          बाज़ार भाव
        </button>
        <button
          onClick={() => processVoiceCommand('soil')}
          className="bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm hover:bg-purple-200 transition-colors"
        >
          मिट्टी सलाह
        </button>
      </div>
    </div>
  );
};

export default VoiceAssistant;