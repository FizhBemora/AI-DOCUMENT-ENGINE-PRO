
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ProgressSection from './components/ProgressSection';
import PreviewSection from './components/PreviewSection';
import HistoryModal from './components/HistoryModal';
import Toast from './components/Toast';
import { DocumentForm, GeneratedDocument, ProgressStep, StepStatus } from './types';
import { INITIAL_PROGRESS_STEPS, APP_VERSION } from './constants';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedDocument[]>(() => {
    const saved = localStorage.getItem('doc_history_pro');
    return saved ? JSON.parse(saved) : [];
  });
  const [steps, setSteps] = useState<ProgressStep[]>(INITIAL_PROGRESS_STEPS);
  const [currentDoc, setCurrentDoc] = useState<GeneratedDocument | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const geminiRef = useRef<GeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const updateStep = (id: number, status: StepStatus) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, status } : step));
  };

  const handleGenerate = async (formData: DocumentForm) => {
    setIsGenerating(true);
    setCurrentDoc(null);
    setSteps(INITIAL_PROGRESS_STEPS.map(s => ({ ...s, status: StepStatus.PENDING })));
    
    setTimeout(() => {
      document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      updateStep(1, StepStatus.ACTIVE);
      await delay(600);
      updateStep(1, StepStatus.DONE);

      updateStep(2, StepStatus.ACTIVE);
      await delay(500);
      updateStep(2, StepStatus.DONE);

      updateStep(3, StepStatus.ACTIVE);
      await delay(400);
      updateStep(3, StepStatus.DONE);

      updateStep(4, StepStatus.ACTIVE);
      await delay(800);
      updateStep(4, StepStatus.DONE);

      updateStep(5, StepStatus.ACTIVE);
      if (!geminiRef.current) throw new Error("Gemini service not ready");
      const content = await geminiRef.current.generateDocumentContent(formData);
      updateStep(5, StepStatus.DONE);

      updateStep(6, StepStatus.ACTIVE);
      await delay(700);
      updateStep(6, StepStatus.DONE);

      updateStep(7, StepStatus.ACTIVE);
      await delay(1000);
      updateStep(7, StepStatus.DONE);

      updateStep(8, StepStatus.ACTIVE);
      await delay(1000);
      updateStep(8, StepStatus.DONE);

      updateStep(9, StepStatus.ACTIVE);
      const newDoc: GeneratedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        jenis: formData.jenis,
        judul: formData.judul,
        date: new Date().toISOString(),
        docx_url: '#',
        pdf_url: '#',
        preview_text: content,
        meta: formData
      };
      
      const newHistory = [newDoc, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('doc_history_pro', JSON.stringify(newHistory));
      await delay(500);
      updateStep(9, StepStatus.DONE);

      updateStep(10, StepStatus.DONE);
      setCurrentDoc(newDoc);
      setToast({ message: 'Dokumen profesional berhasil dibuat!', type: 'success' });
      
      setTimeout(() => {
        document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

    } catch (error: any) {
      console.error(error);
      setSteps(prev => prev.map(s => s.status === StepStatus.ACTIVE ? { ...s, status: StepStatus.ERROR } : s));
      setToast({ message: 'Gagal menghubungkan ke AI. Coba lagi.', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        isBackendOnline={isBackendOnline}
        onViewHistory={() => setIsHistoryOpen(true)}
      />

      <main className="flex-grow max-w-[1000px] mx-auto w-full px-6 py-12">
        <div className="mb-12 text-center space-y-3">
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Academic AI Engine</h2>
           <p className="text-slate-400 font-medium">Platform cerdas penghasil dokumen akademik standar perguruan tinggi.</p>
        </div>

        <FormSection onGenerate={handleGenerate} isGenerating={isGenerating} />
        
        {(isGenerating || currentDoc) && (
          <ProgressSection steps={steps} />
        )}

        {currentDoc && (
          <PreviewSection 
            document={currentDoc} 
            onCopy={() => {
              navigator.clipboard.writeText(currentDoc.preview_text);
              setToast({ message: 'Teks disalin ke clipboard!', type: 'info' });
            }} 
            onRegenerate={() => {
               document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        )}
      </main>

      <footer className="max-w-[1000px] mx-auto w-full px-6 py-12 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 AI DOCUMENT ENGINE PRO • ALL RIGHTS RESERVED</p>
        <div className="flex items-center gap-6">
           <span className="text-primary">SECURE ENCRYPTION ENABLED</span>
           <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{APP_VERSION}</span>
        </div>
      </footer>

      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default App;
