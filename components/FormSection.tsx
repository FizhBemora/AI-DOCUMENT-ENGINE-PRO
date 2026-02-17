
import React, { useState } from 'react';
import { DocumentForm, SubjectArea } from '../types';

interface FormSectionProps {
  onGenerate: (data: DocumentForm) => void;
  isGenerating: boolean;
}

const SUBJECT_OPTIONS: SubjectArea[] = [
  'Bahasa Indonesia', 'Bahasa Inggris', 'Matematika (Wajib)', 'Matematika (Peminatan)', 
  'Fisika', 'Kimia', 'Biologi', 'Sejarah Indonesia', 'Sejarah Peminatan', 
  'Geografi', 'Sosiologi', 'Ekonomi', 'Antropologi', 'Informatika', 
  'Prakarya & Kewirausahaan', 'PAI & Budi Pekerti', 'Pendidikan Pancasila/PKN', 
  'PJOK', 'Seni Rupa', 'Seni Musik', 'Seni Tari', 'Seni Teater', 
  'Bahasa Arab', 'Bahasa Jepang', 'Filsafat Dasar', 'Psikologi Remaja'
];

const FormSection: React.FC<FormSectionProps> = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState<DocumentForm>({
    jenis: 'Makalah', judul: '', anggota_kelompok: '', kelompok: '', kelas: '11A', sekolah: 'SMAN 1 KALEDUPA',
    tahun: new Date().getFullYear().toString(), kota: 'Kecamatan Kaledupa', dosen_pembimbing: '', nip_dosen: '',
    level: 'SMA', subject: 'Bahasa Indonesia', method: 'Studi Pustaka', citation: 'APA 7th', tone: 'Formal',
    bahasa: 'Indonesia', max_pages: 50, chapter_depth: 'Mendalam', target_audience: 'Akademisi', urgensi_penelitian: '',
    include_toc: true, include_ref: true, include_abstract: true, include_glossary: false, include_appendix: false,
    include_methodology_detail: true, include_data_analysis: true, include_executive_summary: false,
    include_acknowledgment: true, struktur: '', font_family: 'Times New Roman', font_size: 12, line_spacing: 1.5,
    margin_top: 3, margin_bottom: 3, margin_left: 4, margin_right: 3, paper_size: 'A4', alignment: 'Justify',
    header_footer: true, use_smart_citations: true, auto_generate_keywords: true, focus_on_case_study: false,
    include_data_dummy: false, critical_thinking_mode: true, simplified_explanation: false, primary_source_only: true,
    include_ethical_clearance: false, include_limitations: true, force_clean_format: true
  });

  const [activeTab, setActiveTab] = useState<'identity' | 'academic' | 'content' | 'layout'>('identity');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (['max_pages', 'font_size', 'line_spacing', 'margin_top', 'margin_bottom', 'margin_left', 'margin_right'].includes(name) ? parseFloat(value) || 0 : value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul) return alert("Mohon isi judul dokumen!");
    if (!isGenerating) onGenerate(formData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        {(['identity', 'academic', 'content', 'layout'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'text-primary bg-white dark:bg-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'identity' ? '1. Identitas' : tab === 'academic' ? '2. Akademik' : tab === 'content' ? '3. Konten' : '4. Layout'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-10">
        {activeTab === 'identity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Dokumen (SMA Edition)</label>
              <input name="judul" value={formData.judul} onChange={handleChange} placeholder="Analisis Dampak Media Sosial terhadap Siswa SMAN 1 Kaledupa" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Kelompok</label>
              <input name="kelompok" value={formData.kelompok} onChange={handleChange} placeholder="Kelompok 1 - XI MIPA 1" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sekolah</label>
              <input name="sekolah" value={formData.sekolah} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anggota Kelompok</label>
              <textarea name="anggota_kelompok" value={formData.anggota_kelompok} onChange={handleChange} rows={2} placeholder="Nama Siswa 1, Siswa 2..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guru Pembimbing</label>
              <input name="dosen_pembimbing" value={formData.dosen_pembimbing} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kota & Tahun</label>
              <div className="flex gap-2">
                <input name="kota" value={formData.kota} onChange={handleChange} className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
                <input name="tahun" value={formData.tahun} onChange={handleChange} className="w-24 px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tingkat Pendidikan</label>
              <select name="level" value={formData.level} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                <option>SMA</option><option>Sarjana (S1)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                {SUBJECT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Abstrak', name: 'include_abstract' },
                { label: 'Daftar Isi', name: 'include_toc' },
                { label: 'Daftar Pustaka', name: 'include_ref' },
                { label: 'Kata Pengantar', name: 'include_acknowledgment' },
                { label: 'Kritis Mode', name: 'critical_thinking_mode' }
              ].map(f => (
                <label key={f.name} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="checkbox" name={f.name} checked={(formData as any)[f.name]} onChange={handleChange} className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{f.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spasi</label>
              <select name="line_spacing" value={formData.line_spacing} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                <option value="1.5">1.5</option><option value="2.0">2.0</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ukuran Kertas</label>
              <select name="paper_size" value={formData.paper_size} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                <option>A4</option><option>Letter</option>
              </select>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isGenerating} 
          className="w-full mt-10 py-6 rounded-[2rem] bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-[0.2em] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 text-base"
        >
          {isGenerating ? 'AI Sedang Menulis...' : 'PROSES GENERATE DOKUMEN'}
        </button>
      </form>
    </div>
  );
};

export default FormSection;
