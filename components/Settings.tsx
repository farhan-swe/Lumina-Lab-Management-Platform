
import React from 'react';
import { storageService } from '../services/storageService';

const Settings: React.FC = () => {
  const handleExport = () => {
    storageService.exportData();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (confirm('Importing will overwrite existing data. Continue?')) {
        const ok = await storageService.importData(file);
        if (ok) {
          alert('Data imported successfully. Reloading...');
          window.location.reload();
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Configure your lab environment and manage data backups.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Data Management</h3>
          </div>
          <p className="text-sm text-slate-500">Keep your data safe by exporting periodic backups. You can restore your data to any device using these JSON files.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleExport}
              className="flex-1 px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Export JSON Backup
            </button>
            <div className="flex-1 relative">
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <button className="w-full px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                Restore from Backup
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold">System Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Version</span>
              <span className="font-bold text-slate-900">2.1.0-Enterprise</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Environment</span>
              <span className="font-bold text-slate-900 uppercase text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">Production</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Storage Type</span>
              <span className="font-bold text-slate-900">Local (Browser)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
