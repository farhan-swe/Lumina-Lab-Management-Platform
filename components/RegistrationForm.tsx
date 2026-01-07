
import React, { useState, useEffect } from 'react';
import { Patient, TestItem, Registration } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';

interface RegistrationFormProps {
  onSuccess: (reg: Registration) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [availableTests, setAvailableTests] = useState<TestItem[]>([]);
  const [patient, setPatient] = useState<Patient>({
    name: '',
    age: 0,
    gender: 'Male',
    phone: '',
    email: ''
  });
  const [selectedTests, setSelectedTests] = useState<TestItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [aiTip, setAiTip] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAvailableTests(storageService.getTests());
    // Default delivery date: tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeliveryDate(tomorrow.toISOString().slice(0, 16));
  }, []);

  const toggleTest = (test: TestItem) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const total = selectedTests.reduce((acc, t) => acc + t.price, 0);
  const netAmount = total - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTests.length === 0) {
      alert('Please select at least one test.');
      return;
    }

    setLoading(true);
    const regId = storageService.generateRegId();
    const newReg: Registration = {
      id: regId,
      patient,
      tests: selectedTests,
      totalAmount: total,
      discount,
      paidAmount,
      registrationDate: new Date().toISOString(),
      deliveryDate: new Date(deliveryDate).toISOString(),
      status: 'Pending'
    };

    const summary = await geminiService.generateQuickSummary(newReg);
    setAiTip(summary);
    storageService.saveRegistration(newReg);
    setLoading(false);
    onSuccess(newReg);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Patient Registration</h1>
        <p className="text-slate-500">Fill in patient details and select required tests.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Patient Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4 text-indigo-700">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  type="text" required value={patient.name} 
                  onChange={e => setPatient({...patient, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input 
                  type="tel" required value={patient.phone}
                  onChange={e => setPatient({...patient, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="+92 300 1234567"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Age</label>
                  <input 
                    type="number" required value={patient.age || ''}
                    onChange={e => setPatient({...patient, age: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Gender</label>
                  <select 
                    value={patient.gender}
                    onChange={e => setPatient({...patient, gender: e.target.value as any})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address (Optional)</label>
                <input 
                  type="email" value={patient.email}
                  onChange={e => setPatient({...patient, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="patient@example.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4 text-indigo-700">Select Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {availableTests.map(test => (
                <div 
                  key={test.id}
                  onClick={() => toggleTest(test)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    selectedTests.find(t => t.id === test.id)
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-800">{test.name}</p>
                    <p className="text-xs text-slate-500">{test.category}</p>
                  </div>
                  <p className="font-bold text-indigo-600">₨ {test.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Billing & Summary */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
            <h3 className="text-lg font-bold border-b pb-4 text-indigo-700">Billing Summary</h3>
            <div className="py-6 space-y-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">₨ {total}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-600">Discount</span>
                <input 
                  type="number" value={discount}
                  onChange={e => setDiscount(Math.min(total, parseInt(e.target.value) || 0))}
                  className="w-24 px-3 py-1 text-right bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div className="pt-4 border-t-2 border-slate-100 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Net Amount</span>
                <span className="text-2xl font-black text-indigo-600">₨ {netAmount}</span>
              </div>
              <div className="space-y-2 mt-6">
                <label className="text-sm font-semibold text-slate-700">Paid Amount</label>
                <input 
                  type="number" required value={paidAmount}
                  onChange={e => setPaidAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-indigo-50 border-2 border-indigo-100 text-xl font-bold text-indigo-700 rounded-xl outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Report Delivery Time</label>
                <input 
                  type="datetime-local" required value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || selectedTests.length === 0}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Confirm Registration
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
          
          {aiTip && (
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl animate-in zoom-in duration-300">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="font-bold text-sm tracking-widest uppercase">Lumina Intelligence</span>
              </div>
              <p className="text-sm italic leading-relaxed opacity-90">"{aiTip}"</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
