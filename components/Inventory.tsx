
import React, { useState, useEffect } from 'react';
import { TestItem } from '../types';
import { storageService } from '../services/storageService';

const Inventory: React.FC = () => {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTest, setNewTest] = useState<Partial<TestItem>>({ name: '', category: 'General', price: 0 });

  useEffect(() => {
    setTests(storageService.getTests());
  }, []);

  const handleSave = () => {
    if (newTest.name && newTest.price) {
      const updated = [...tests, { ...newTest, id: Date.now().toString() } as TestItem];
      setTests(updated);
      storageService.saveTests(updated);
      setIsAdding(false);
      setNewTest({ name: '', category: 'General', price: 0 });
    }
  };

  const deleteTest = (id: string) => {
    if (confirm('Delete this test?')) {
      const updated = tests.filter(t => t.id !== id);
      setTests(updated);
      storageService.saveTests(updated);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Test Catalog</h1>
          <p className="text-slate-500">Manage available lab tests and their pricing.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Test
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {isAdding && (
            <div className="p-6 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 flex flex-col gap-4 animate-in zoom-in duration-300">
              <h4 className="font-bold text-indigo-700">Add Test</h4>
              <input 
                placeholder="Test Name" 
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none"
                value={newTest.name}
                onChange={e => setNewTest({...newTest, name: e.target.value})}
              />
              <input 
                placeholder="Category" 
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none"
                value={newTest.category}
                onChange={e => setNewTest({...newTest, category: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Price" 
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none"
                value={newTest.price || ''}
                onChange={e => setNewTest({...newTest, price: parseInt(e.target.value) || 0})}
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold">Save</button>
                <button onClick={() => setIsAdding(false)} className="flex-1 py-2 bg-slate-200 text-slate-600 rounded-lg font-bold">Cancel</button>
              </div>
            </div>
          )}

          {tests.map(test => (
            <div key={test.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{test.name}</h4>
                  <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">{test.category}</p>
                </div>
                <button onClick={() => deleteTest(test.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-xl font-black text-indigo-600">₨ {test.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
