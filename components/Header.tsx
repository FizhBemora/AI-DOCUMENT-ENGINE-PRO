
import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isBackendOnline: boolean;
  onViewHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, isBackendOnline, onViewHistory }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm">
      <div className="max-w-[1000px] mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Document Engine Pro
          </h1>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium uppercase tracking-wider">
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-success animate-pulse' : 'bg-error'}`}></span>
            {isBackendOnline ? 'Connected' : 'Offline'}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          
          <button
            onClick={onViewHistory}
            className="text-sm font-medium px-4 py-2 rounded-xl-custom bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            View History
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
