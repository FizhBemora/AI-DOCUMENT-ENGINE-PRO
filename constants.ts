
import { ProgressStep, StepStatus } from './types';

export const INITIAL_PROGRESS_STEPS: ProgressStep[] = [
  { id: 1, label: 'System Initialized', status: StepStatus.PENDING },
  { id: 2, label: 'Input Validated', status: StepStatus.PENDING },
  { id: 3, label: 'Prompt Constructed', status: StepStatus.PENDING },
  { id: 4, label: 'Connecting to AI', status: StepStatus.PENDING },
  { id: 5, label: 'Generating Content', status: StepStatus.PENDING },
  { id: 6, label: 'Cleaning Text', status: StepStatus.PENDING },
  { id: 7, label: 'Building DOCX', status: StepStatus.PENDING },
  { id: 8, label: 'Building PDF', status: StepStatus.PENDING },
  { id: 9, label: 'Saving History', status: StepStatus.PENDING },
  { id: 10, label: 'Completed', status: StepStatus.PENDING },
];

export const APP_VERSION = 'v1.0 Production';
