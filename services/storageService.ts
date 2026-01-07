
import { Registration, TestItem } from '../types';
import { DEFAULT_TESTS } from '../constants';

const STORAGE_KEYS = {
  REGISTRATIONS: 'lumina_lab_registrations',
  TESTS: 'lumina_lab_tests',
  LAST_ID_COUNTER: 'lumina_lab_counter'
};

export const storageService = {
  getRegistrations: (): Registration[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveRegistration: (reg: Registration) => {
    const regs = storageService.getRegistrations();
    regs.unshift(reg); // Newest first
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
  },

  getTests: (): TestItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TESTS);
    return data ? JSON.parse(data) : DEFAULT_TESTS;
  },

  saveTests: (tests: TestItem[]) => {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(tests));
  },

  generateRegId: (): string => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    let counter = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_ID_COUNTER) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.LAST_ID_COUNTER, counter.toString());
    
    const seq = counter.toString().padStart(4, '0');
    return `LAB-${dateStr}-${seq}`;
  },

  exportData: () => {
    const data = {
      registrations: storageService.getRegistrations(),
      tests: storageService.getTests(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lumina_Lab_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  importData: async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.registrations) localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(data.registrations));
      if (data.tests) localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(data.tests));
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }
};
