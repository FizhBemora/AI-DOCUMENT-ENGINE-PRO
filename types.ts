
export type DocumentType = 'Makalah' | 'Proposal' | 'Laporan' | 'Skripsi/Tesis' | 'Jurnal' | 'Custom';
export type AcademicLevel = 'SMA' | 'Diploma (D3)' | 'Sarjana (S1)' | 'Magister (S2)';
export type CitationStyle = 'APA 7th' | 'MLA' | 'Harvard' | 'IEEE' | 'Chicago';
export type DocTone = 'Formal' | 'Sangat Formal' | 'Analitis' | 'Deskriptif';

export interface DocumentForm {
  jenis: DocumentType;
  judul: string;
  anggota_kelompok: string;
  kelompok: string;
  kelas: string;
  sekolah: string;
  tahun: string;
  max_pages: number;
  struktur: string;
  level: AcademicLevel;
  citation: CitationStyle;
  tone: DocTone;
  bahasa: 'Indonesia' | 'English';
  include_toc: boolean;
  include_ref: boolean;
}

export interface GeneratedDocument {
  id: string;
  jenis: DocumentType;
  judul: string;
  date: string;
  docx_url: string;
  pdf_url: string;
  preview_text: string;
  meta: Partial<DocumentForm>;
}

export enum StepStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DONE = 'done',
  ERROR = 'error'
}

export interface ProgressStep {
  id: number;
  label: string;
  status: StepStatus;
}
