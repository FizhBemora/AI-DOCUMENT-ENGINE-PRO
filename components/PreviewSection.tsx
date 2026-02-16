
import React from 'react';
import { GeneratedDocument } from '../types';

interface PreviewSectionProps {
  document: GeneratedDocument;
  onCopy: () => void;
  onRegenerate: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ document, onCopy, onRegenerate }) => {
  return (
    <div id="preview-section" className="mt-12 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Dokumen Selesai</h2>
          <p className="text-sm text-slate-400 font-medium">Draft akademik telah berhasil disusun oleh AI Engine.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onCopy}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold hover:shadow-lg transition-all"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            Salin Teks
          </button>
          <a 
            href={document.docx_url}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Export DOCX
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="ml-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Document_Viewer.exe</span>
          </div>
          <span className="text-xs font-bold text-primary">{document.jenis} - {document.judul.substring(0, 20)}...</span>
        </div>
        
        <div className="p-10 md:p-16 max-h-[700px] overflow-y-auto scroll-smooth custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
          <div className="max-w-3xl mx-auto">
             <div className="text-center mb-16 space-y-4">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase leading-tight">{document.judul}</h1>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                <div className="pt-8 space-y-1 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                  <p>Disusun oleh: {document.meta.kelompok || 'Individual'}</p>
                  <div className="whitespace-pre-line">{document.meta.anggota_kelompok}</div>
                  <p className="pt-4">{document.meta.sekolah}</p>
                  <p>{document.meta.tahun}</p>
                </div>
             </div>

             <article className="prose prose-slate dark:prose-invert max-w-none text-justify font-serif leading-loose text-slate-800 dark:text-slate-200">
                {document.preview_text.split('\n').map((line, idx) => {
                  const cleanLine = line.trim();
                  if (!cleanLine) return <br key={idx} />;
                  
                  // Highlight BAB
                  if (cleanLine.toUpperCase().startsWith('BAB') || cleanLine.toUpperCase().startsWith('DAFTAR')) {
                    return <h2 key={idx} className="text-2xl font-black mt-12 mb-6 text-slate-900 dark:text-white border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">{cleanLine}</h2>;
                  }
                  
                  // Sub-headers
                  if (/^\d+\.\d+/.test(cleanLine)) {
                    return <h3 key={idx} className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100">{cleanLine}</h3>;
                  }

                  return <p key={idx} className="mb-6">{cleanLine}</p>;
                })}
             </article>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pb-12">
        <button 
          onClick={onRegenerate}
          className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-colors font-bold text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Kurang puas? Generate ulang dengan parameter berbeda
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
