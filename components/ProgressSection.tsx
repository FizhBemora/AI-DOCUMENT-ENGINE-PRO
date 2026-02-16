
import React from 'react';
import { ProgressStep, StepStatus } from '../types';

interface ProgressSectionProps {
  steps: ProgressStep[];
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ steps }) => {
  const completedSteps = steps.filter(s => s.status === StepStatus.DONE).length;
  const progressPercent = Math.min((completedSteps / steps.length) * 100, 100);

  return (
    <div id="progress-section" className="bg-white dark:bg-slate-900 rounded-xl-custom shadow-soft p-8 mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generation Progress
        </h2>
        <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-4 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
              step.status === StepStatus.DONE 
                ? 'bg-success border-success text-white' 
                : step.status === StepStatus.ACTIVE 
                ? 'bg-primary/10 border-primary text-primary animate-pulse'
                : step.status === StepStatus.ERROR
                ? 'bg-error border-error text-white'
                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-300'
            }`}>
              {step.status === StepStatus.DONE ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : step.status === StepStatus.ERROR ? (
                <span className="text-xs font-bold">!</span>
              ) : (
                <span className="text-xs font-bold">{step.id}</span>
              )}
            </div>
            <span className={`text-sm font-medium transition-colors ${
              step.status === StepStatus.DONE 
                ? 'text-success' 
                : step.status === StepStatus.ACTIVE 
                ? 'text-primary'
                : step.status === StepStatus.ERROR
                ? 'text-error'
                : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
