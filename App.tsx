import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Dashboard />
      </div>
    </LanguageProvider>
  );
}

export default App;