
import React, { useState, useEffect } from 'react';
import { ViewType, Registration } from './types';
import { storageService } from './services/storageService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import History from './components/History';
import Inventory from './components/Inventory';
import Settings from './components/Settings';
import Receipt from './components/Receipt';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>('dashboard');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<Registration | null>(null);

  useEffect(() => {
    setRegistrations(storageService.getRegistrations());
  }, []);

  const refreshData = () => {
    setRegistrations(storageService.getRegistrations());
  };

  const handleRegistrationSuccess = (reg: Registration) => {
    refreshData();
    setActiveReceipt(reg);
    setView('dashboard');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="no-print">
        <Sidebar currentView={currentView} setView={setView} />
      </div>

      <main className="flex-1 p-8 lg:p-12 transition-all">
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && <Dashboard registrations={registrations} />}
          {currentView === 'registration' && <RegistrationForm onSuccess={handleRegistrationSuccess} />}
          {currentView === 'history' && <History registrations={registrations} onViewDetails={setActiveReceipt} />}
          {currentView === 'inventory' && <Inventory />}
          {currentView === 'settings' && <Settings />}
        </div>
      </main>

      {activeReceipt && (
        <Receipt 
          reg={activeReceipt} 
          onClose={() => setActiveReceipt(null)} 
        />
      )}
    </div>
  );
};

export default App;
