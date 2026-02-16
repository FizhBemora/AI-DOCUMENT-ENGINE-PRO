
import React from 'react';
import { GeneratedDocument } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedDocument[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl-custom shadow-2xl overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-lg">Document History</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No documents generated yet.</p>
            </div>
          ) : (
            history.slice(0, 5).map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl-custom border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{doc.judul}</h4>
                    <div className="flex gap-2 text-[10px] font-bold uppercase mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">{doc.jenis}</span>
                      <span className="text-slate-400">{new Date(doc.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <a href={doc.docx_url} download className="flex-1 text-center text-xs font-bold py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">DOCX</a>
                  <a href={doc.pdf_url} download className="flex-1 text-center text-xs font-bold py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">PDF</a>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl-custom bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
