
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ProgressSection from './components/ProgressSection';
import PreviewSection from './components/PreviewSection';
import HistoryModal from './components/HistoryModal';
import Toast from './components/Toast';
import { DocumentForm, GeneratedDocument, ProgressStep, StepStatus, BotSettings } from './types';
import { INITIAL_PROGRESS_STEPS } from './constants';
import { GeminiService } from './services/geminiService';
import { TelegramService } from './services/telegramService';
import { DocxService } from './services/docxService';

const HARDCODED_BOT: BotSettings = {
  token: '8535426413:AAHfoJz7bWjMb7YMEzWMc0g0iPKWvOs3bPM',
  chatId: '7906533350',
  autoSend: true
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isBotOnline, setIsBotOnline] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [history, setHistory] = useState<GeneratedDocument[]>(() => {
    const saved = localStorage.getItem('doc_history_v2_5_2');
    return saved ? JSON.parse(saved) : [];
  });

  const [steps, setSteps] = useState<ProgressStep[]>(INITIAL_PROGRESS_STEPS);
  const [currentDoc, setCurrentDoc] = useState<GeneratedDocument | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const geminiRef = useRef<GeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();
    TelegramService.testConnection(HARDCODED_BOT.token).then(setIsBotOnline);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const updateStep = (id: number, status: StepStatus) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, status } : step));
  };

  const handleGenerate = async (formData: DocumentForm) => {
    setIsGenerating(true);
    setCurrentDoc(null);
    setSteps(INITIAL_PROGRESS_STEPS.map(s => ({ ...s, status: StepStatus.PENDING })));
    
    let finalContent = "";
    let docxBlob: Blob | undefined;

    try {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      // Quick internal system setup steps
      for(let i=1; i<=4; i++){
        updateStep(i, StepStatus.ACTIVE);
        await delay(200);
        updateStep(i, StepStatus.DONE);
      }

      updateStep(5, StepStatus.ACTIVE);
      if (!geminiRef.current) throw new Error("Gemini Not Ready");
      finalContent = await geminiRef.current.generateDocumentContent(formData);
      updateStep(5, StepStatus.DONE);

      updateStep(6, StepStatus.ACTIVE);
      await delay(300);
      updateStep(6, StepStatus.DONE);

      updateStep(7, StepStatus.ACTIVE);
      docxBlob = await DocxService.generate(finalContent, formData);
      updateStep(7, StepStatus.DONE);

      updateStep(8, StepStatus.ACTIVE);
      let telegramStatus: 'sent' | 'failed' | 'idle' = 'idle';
      if (docxBlob) {
        const caption = `<b>📄 DOKUMEN SMA BERHASIL GENERATED</b>\n<b>Judul:</b> ${TelegramService.escapeHtml(formData.judul)}\n<b>Sekolah:</b> ${formData.sekolah}\n<b>Dibuat oleh:</b> AI Document Engine Pro`;
        const success = await TelegramService.sendDocx(
          HARDCODED_BOT.token, 
          HARDCODED_BOT.chatId, 
          docxBlob, 
          formData.judul.substring(0, 40), 
          caption
        );
        telegramStatus = success ? 'sent' : 'failed';
        updateStep(8, success ? StepStatus.DONE : StepStatus.ERROR);
      }

      updateStep(9, StepStatus.ACTIVE);
      const newDoc: GeneratedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        jenis: formData.jenis,
        judul: formData.judul,
        date: new Date().toISOString(),
        preview_text: finalContent,
        docx_blob: docxBlob,
        meta: formData,
        telegram_status: telegramStatus
      };
      setHistory(prev => [newDoc, ...prev].slice(0, 10));
      localStorage.setItem('doc_history_v2_5_2', JSON.stringify([newDoc, ...history].slice(0, 10)));
      updateStep(9, StepStatus.DONE);
      updateStep(10, StepStatus.DONE);

      setCurrentDoc(newDoc);
      setToast({ message: 'Dokumen Selesai! Cek Telegram atau Unduh Langsung.', type: 'success' });
      
    } catch (error: any) {
      console.error(error);
      setSteps(prev => prev.map(s => s.status === StepStatus.ACTIVE ? { ...s, status: StepStatus.ERROR } : s));
      setToast({ message: 'Terjadi gangguan sistem AI.', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocx = () => {
    if (currentDoc && currentDoc.docx_blob) {
      DocxService.download(currentDoc.docx_blob, currentDoc.judul);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-backgroundLight dark:bg-backgroundDark font-sans selection:bg-primary/30">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        isBackendOnline={isBotOnline}
        onViewHistory={() => setIsHistoryOpen(true)}
      />

      <main className="max-w-[1000px] mx-auto w-full px-6 py-12 flex flex-col gap-10">
        <FormSection onGenerate={handleGenerate} isGenerating={isGenerating} />
        
        { (isGenerating || steps.some(s => s.status !== StepStatus.PENDING)) && <ProgressSection steps={steps} /> }
        
        {currentDoc && (
          <PreviewSection 
            document={currentDoc} 
            onCopy={() => navigator.clipboard.writeText(currentDoc.preview_text)} 
            onRegenerate={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onDownloadDocx={handleDownloadDocx}
          />
        )}
      </main>

      <footer className="mt-auto py-12 text-center border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="mb-2 text-primary font-black tracking-widest text-[10px]">AI DOCUMENT ENGINE PRO V2.5.2</div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          © Fizhsoftspoken 2026 - All Rights Reserved
        </p>
      </footer>

      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} history={history} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
