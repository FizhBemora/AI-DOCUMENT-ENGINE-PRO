
import React from 'react';
import { BotSettings } from '../types';

interface BotSettingsProps {
  settings: BotSettings;
  onChange: (settings: BotSettings) => void;
  isOnline: boolean;
}

const BotSettingsComp: React.FC<BotSettingsProps> = ({ settings, onChange, isOnline }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Bot Telegram Dashboard
        </h2>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isOnline ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
          {isOnline ? 'Bot Connected' : 'Bot Offline'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Telegram Bot Token (HTTP API)</label>
          <input
            type="password"
            value={settings.token}
            onChange={(e) => onChange({ ...settings, token: e.target.value })}
            placeholder="7482xxxxx:AAHxxxxxxxx..."
            className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Target Chat ID</label>
          <input
            type="text"
            value={settings.chatId}
            onChange={(e) => onChange({ ...settings, chatId: e.target.value })}
            placeholder="Contoh: -100xxxxxxxx atau 12345678"
            className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-mono text-sm"
          />
        </div>

        <div className="pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={settings.autoSend} 
                onChange={(e) => onChange({ ...settings, autoSend: e.target.checked })} 
                className="sr-only" 
              />
              <div className={`w-10 h-5 rounded-full transition-colors ${settings.autoSend ? 'bg-primary' : 'bg-slate-300'}`}></div>
              <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${settings.autoSend ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Kirim Otomatis ke Telegram setelah Generate</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BotSettingsComp;
