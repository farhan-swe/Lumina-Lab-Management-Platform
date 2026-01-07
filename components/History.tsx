
import React, { useState } from 'react';
import { Registration } from '../types';

interface HistoryProps {
  registrations: Registration[];
  onViewDetails: (reg: Registration) => void;
}

const History: React.FC<HistoryProps> = ({ registrations, onViewDetails }) => {
  const [search, setSearch] = useState('');

  const filtered = registrations.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) || 
    r.patient.name.toLowerCase().includes(search.toLowerCase()) ||
    r.patient.phone.includes(search)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Records</h1>
          <p className="text-slate-500">Manage and view all lab test history.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by ID, Name or Phone..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reg ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-indigo-600">{reg.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{reg.patient.name}</p>
                    <p className="text-xs text-slate-500">{reg.patient.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(reg.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">₨ {reg.paidAmount}</p>
                    <p className="text-[10px] text-slate-400">Bal: ₨ {reg.totalAmount - reg.discount - reg.paidAmount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      reg.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      reg.status === 'Completed' ? 'bg-indigo-100 text-indigo-700' :
                      reg.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onViewDetails(reg)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-all"
                    >
                      Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                    No records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
