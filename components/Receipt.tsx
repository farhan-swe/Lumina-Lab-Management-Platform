
import React from 'react';
import { Registration } from '../types';

interface ReceiptProps {
  reg: Registration;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ reg, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div id="receipt-content" className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-100 pb-6">
            <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">LUMINA LABORATORY</h2>
            <p className="text-slate-500 font-medium">123 Health Ave, Medical District, Capital City</p>
            <p className="text-indigo-600 font-bold">Contact: +92 321 0000000</p>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-8 text-sm bg-slate-50 p-6 rounded-2xl">
            <div className="space-y-2">
              <p className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Patient Details</p>
              <p className="text-lg font-bold text-slate-900">{reg.patient.name}</p>
              <p className="text-slate-600">{reg.patient.age} Yrs / {reg.patient.gender}</p>
              <p className="text-slate-600">{reg.patient.phone}</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Registration Info</p>
              <p className="text-lg font-mono font-black text-indigo-600">{reg.id}</p>
              <p className="text-slate-600">Date: {new Date(reg.registrationDate).toLocaleDateString()}</p>
              <p className="text-amber-600 font-bold">Delivery: {new Date(reg.deliveryDate).toLocaleString()}</p>
            </div>
          </div>

          {/* Tests Table */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">Tests Breakdown</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-100 text-xs text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-2">Test Name</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reg.tests.map((test, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-3 font-medium text-slate-700">{test.name}</td>
                    <td className="py-3 text-right font-bold text-slate-900">₨ {test.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-100">
                  <td className="pt-4 text-slate-500 font-medium">Total Amount</td>
                  <td className="pt-4 text-right font-bold text-slate-900">₨ {reg.totalAmount}</td>
                </tr>
                {reg.discount > 0 && (
                  <tr>
                    <td className="text-slate-500 font-medium">Discount</td>
                    <td className="text-right font-bold text-emerald-600">- ₨ {reg.discount}</td>
                  </tr>
                )}
                <tr className="text-xl">
                  <td className="pt-4 text-indigo-700 font-black">Paid Amount</td>
                  <td className="pt-4 text-right text-indigo-700 font-black">₨ {reg.paidAmount}</td>
                </tr>
                {(reg.totalAmount - reg.discount - reg.paidAmount) > 0 && (
                  <tr className="text-sm">
                    <td className="text-rose-500 font-bold">Balance Due</td>
                    <td className="text-right text-rose-500 font-bold">₨ {reg.totalAmount - reg.discount - reg.paidAmount}</td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-dashed border-slate-200 pt-8 text-center space-y-4">
            <p className="text-xs text-slate-400 italic">This is a computer-generated receipt and does not require a physical signature.</p>
            <div className="flex justify-center gap-4 no-print">
              <button 
                onClick={() => window.print()}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Print Version (Hidden on Web) */}
      <div className="print-only fixed inset-0 bg-white p-8">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #receipt-content, #receipt-content * { visibility: visible; }
            #receipt-content { position: absolute; left: 0; top: 0; width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Receipt;
