
import { ProgressStep, StepStatus } from './types';

export const INITIAL_PROGRESS_STEPS: ProgressStep[] = [
  { id: 1, label: 'Sistem Diinisialisasi', status: StepStatus.PENDING },
  { id: 2, label: 'Validasi Input & Parameter', status: StepStatus.PENDING },
  { id: 3, label: 'Konstruksi Prompt Akademik', status: StepStatus.PENDING },
  { id: 4, label: 'Menghubungkan ke Gemini AI', status: StepStatus.PENDING },
  { id: 5, label: 'Proses Menulis Konten', status: StepStatus.PENDING },
  { id: 6, label: 'Pembersihan Artefak AI', status: StepStatus.PENDING },
  { id: 7, label: 'Pemformatan Dokumen Akhir', status: StepStatus.PENDING },
  { id: 8, label: 'Sinkronisasi ke Bot Telegram', status: StepStatus.PENDING },
  { id: 9, label: 'Menyimpan ke Riwayat Lokal', status: StepStatus.PENDING },
  { id: 10, label: 'Selesai & Siap Diunduh', status: StepStatus.PENDING },
];

export const APP_VERSION = 'v2.5.1 Bot Command Center';
