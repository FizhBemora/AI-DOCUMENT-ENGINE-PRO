
export type DocumentType = 'Makalah' | 'Proposal' | 'Laporan' | 'Skripsi/Tesis' | 'Jurnal' | 'Buku' | 'Review' | 'Custom';
export type AcademicLevel = 'SMA' | 'Diploma (D3)' | 'Sarjana (S1)' | 'Magister (S2)' | 'Doktoral (S3)';
export type CitationStyle = 'APA 7th' | 'MLA' | 'Harvard' | 'IEEE' | 'Chicago' | 'Vancouver';
export type DocTone = 'Formal' | 'Sangat Formal' | 'Analitis' | 'Kritis' | 'Deskriptif' | 'Argumentatif';
export type ResearchMethod = 'Kualitatif' | 'Kuantitatif' | 'Mixed Method' | 'Studi Pustaka' | 'Eksperimen';

/**
 * SubjectArea extended to include specific SMA subjects used in FormSection options.
 */
export type SubjectArea = 
  | 'Sains' | 'Sosial' | 'Teknologi' | 'Hukum' | 'Ekonomi' | 'Kesehatan' | 'Pendidikan' | 'Seni' | 'Sejarah' | 'Geografi' | 'Sosiologi' | 'Antropologi' | 'Kimia' | 'Fisika' | 'Biologi' | 'Matematika' | 'Bahasa Indonesia' | 'Bahasa Inggris' | 'PAI' | 'PKN' | 'PJOK' | 'Seni Budaya' | 'Ekonomi Bisnis' | 'Informatika' | 'Prakarya' | 'Filsafat' | 'Psikologi' | 'Politik'
  | 'Matematika (Wajib)' | 'Matematika (Peminatan)' | 'Sejarah Indonesia' | 'Sejarah Peminatan' | 'Prakarya & Kewirausahaan' | 'PAI & Budi Pekerti' | 'Pendidikan Pancasila/PKN' | 'Seni Rupa' | 'Seni Musik' | 'Seni Tari' | 'Seni Teater' | 'Bahasa Arab' | 'Bahasa Jepang' | 'Filsafat Dasar' | 'Psikologi Remaja';

export interface BotSettings {
  token: string;
  chatId: string;
  autoSend: boolean;
}

export interface DocumentForm {
  // 1-10: Identitas Utama
  jenis: DocumentType;
  judul: string;
  anggota_kelompok: string;
  kelompok: string;
  kelas: string;
  sekolah: string;
  tahun: string;
  kota: string;
  dosen_pembimbing: string;
  nip_dosen: string;
  
  // 11-20: Parameter Akademik
  level: AcademicLevel;
  subject: SubjectArea;
  method: ResearchMethod;
  citation: CitationStyle;
  tone: DocTone;
  bahasa: 'Indonesia' | 'English';
  max_pages: number;
  chapter_depth: 'Standard' | 'Mendalam' | 'Ringkas';
  target_audience: 'Akademisi' | 'Mahasiswa' | 'Umum';
  urgensi_penelitian: string;

  // 21-30: Konten & Bab
  include_toc: boolean;
  include_ref: boolean;
  include_abstract: boolean;
  include_glossary: boolean;
  include_appendix: boolean;
  include_methodology_detail: boolean;
  include_data_analysis: boolean;
  include_executive_summary: boolean;
  include_acknowledgment: boolean;
  struktur: string;

  // 31-40: Tipografi & Layout (Metadata DOCX)
  font_family: 'Times New Roman' | 'Arial' | 'Calibri';
  font_size: number;
  line_spacing: 1.0 | 1.15 | 1.5 | 2.0;
  margin_top: number;
  margin_bottom: number;
  margin_left: number;
  margin_right: number;
  paper_size: 'A4' | 'Letter' | 'Legal';
  alignment: 'Justify' | 'Left';
  header_footer: boolean;

  // 41-50: Fitur Lanjut
  use_smart_citations: boolean;
  auto_generate_keywords: boolean;
  focus_on_case_study: boolean;
  include_data_dummy: boolean;
  critical_thinking_mode: boolean;
  simplified_explanation: boolean;
  primary_source_only: boolean;
  include_ethical_clearance: boolean;
  include_limitations: boolean;
  force_clean_format: boolean;
}

export interface GeneratedDocument {
  id: string;
  jenis: DocumentType;
  judul: string;
  date: string;
  preview_text: string;
  docx_blob?: Blob;
  meta: Partial<DocumentForm>;
  telegram_status?: 'sent' | 'failed' | 'idle';
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
