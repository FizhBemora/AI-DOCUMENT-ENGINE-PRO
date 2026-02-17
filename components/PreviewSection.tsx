
import React from 'react';
import { GeneratedDocument } from '../types';

interface PreviewSectionProps {
  document: GeneratedDocument;
  onCopy: () => void;
  onRegenerate: () => void;
  onDownloadDocx: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ document, onCopy, onRegenerate, onDownloadDocx }) => {
  let isInTOCMode = false;

  return (
    <div id="preview-section" className="mt-12 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Pratinjau Dokumen</h2>
          <p className="text-sm text-slate-400 font-medium">Dokumen akademik SMA siap diekspor ke DOCX.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onCopy}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold hover:shadow-lg transition-all"
          >
            Salin Teks
          </button>
          <button 
            onClick={onDownloadDocx}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Export DOCX
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">{document.jenis} Preview</span>
          <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-success/10 text-success">
            Generated Successfully
          </div>
        </div>
        
        <div className="p-12 md:p-20 max-h-[1000px] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
             {/* RAME TITLE PAGE */}
             <div className="text-center mb-32 p-16 border-[6px] border-double border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/30 dark:bg-slate-800/20 shadow-inner">
                <div className="text-[12px] font-black mb-6 border-y-2 inline-block px-6 py-1 border-slate-900 dark:border-white uppercase tracking-[0.3em]">{document.jenis}</div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase leading-tight tracking-tight mt-6 mb-12 drop-shadow-sm font-serif">{document.judul}</h1>
                
                <div className="space-y-6 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px]">
                  <div className="py-8 space-y-2 border-y border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400">Disusun Untuk Mata Pelajaran:</p>
                    <p className="text-primary text-lg font-black">{document.meta.subject}</p>
                  </div>

                  <div className="pt-10 space-y-4">
                    <p className="text-slate-500">Penyusun:</p>
                    <p className="text-slate-900 dark:text-white text-base font-black underline underline-offset-8 decoration-primary/30">{document.meta.kelompok}</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-lg mx-auto py-2">
                      {document.meta.anggota_kelompok?.split(',').map((name, i) => (
                        <span key={i} className="text-slate-500 dark:text-slate-400 italic text-[10px]">{name.trim()}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 space-y-2">
                    <p className="text-slate-500">Guru Pembimbing:</p>
                    <p className="text-slate-900 dark:text-white text-base font-black italic">{document.meta.dosen_pembimbing}</p>
                  </div>

                  <div className="pt-24 space-y-3">
                    <p className="text-slate-900 dark:text-white text-xl font-black tracking-widest">{document.meta.sekolah}</p>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                    <p className="text-xs font-medium">{document.meta.kota} • {document.meta.tahun}</p>
                  </div>
                </div>
             </div>

             <article className="prose prose-slate dark:prose-invert max-w-none text-justify font-serif leading-[2.2] text-slate-900 dark:text-slate-100">
                {document.preview_text.split('\n').map((line, idx) => {
                  const cleanLine = line.trim();
                  if (!cleanLine) return <div key={idx} className="h-4" />;
                  
                  const upperLine = cleanLine.toUpperCase();

                  // Handle Markers
                  if (upperLine.includes('[TOC_START]')) {
                    isInTOCMode = true;
                    return <h2 key={idx} className="text-3xl font-black mt-20 mb-10 text-slate-900 dark:text-white text-center border-b-2 pb-6 border-slate-900 dark:border-white">DAFTAR ISI</h2>;
                  }
                  if (upperLine.includes('[TOC_END]')) {
                    isInTOCMode = false;
                    return null;
                  }

                  const isHeader = (upperLine.startsWith('BAB') || upperLine.startsWith('DAFTAR') || upperLine.startsWith('ABSTRAK') || upperLine.startsWith('KATA PENGANTAR') || upperLine.startsWith('PENDAHULUAN')) && !isInTOCMode;

                  if (isHeader) {
                    return (
                      <h2 key={idx} className="text-3xl font-black mt-24 mb-12 text-slate-900 dark:text-white text-center border-b-2 pb-6 border-slate-100 dark:border-slate-800 uppercase tracking-widest">
                        {cleanLine}
                      </h2>
                    );
                  }

                  if (/^\d+\.\d+/.test(cleanLine)) {
                    return (
                      <h3 key={idx} className={`text-xl font-bold mt-12 mb-8 text-slate-900 dark:text-white ${!isInTOCMode ? 'border-l-4 border-primary pl-6 py-1 bg-slate-50/50 dark:bg-slate-800/50' : ''}`}>
                        {cleanLine}
                      </h3>
                    );
                  }

                  // TOC Item Styling
                  if (isInTOCMode) {
                    return (
                      <p key={idx} className={`mb-3 text-[13px] border-b border-dotted border-slate-300 dark:border-slate-700 pb-1 flex justify-between items-baseline font-mono ${upperLine.startsWith('BAB') ? 'font-bold text-slate-900 dark:text-white pt-2' : 'pl-4'}`}>
                        <span>{cleanLine}</span>
                      </p>
                    );
                  }

                  return (
                    <p key={idx} className="mb-6 indent-12 text-lg">
                      {cleanLine}
                    </p>
                  );
                })}
             </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
