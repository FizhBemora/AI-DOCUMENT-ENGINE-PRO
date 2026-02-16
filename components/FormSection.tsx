
import React, { useState, useEffect } from 'react';
import { DocumentForm, DocumentType, AcademicLevel, CitationStyle, DocTone } from '../types';

interface FormSectionProps {
  onGenerate: (data: DocumentForm) => void;
  isGenerating: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState<DocumentForm>({
    jenis: 'Makalah',
    judul: '',
    anggota_kelompok: '',
    kelompok: '',
    kelas: '',
    sekolah: '',
    tahun: new Date().getFullYear().toString(),
    max_pages: 15,
    struktur: '',
    level: 'Sarjana (S1)',
    citation: 'APA 7th',
    tone: 'Formal',
    bahasa: 'Indonesia',
    include_toc: true,
    include_ref: true
  });

  const [activeTab, setActiveTab] = useState<'identity' | 'config' | 'advanced'>('identity');
  const [errors, setErrors] = useState<Partial<Record<keyof DocumentForm, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof DocumentForm, string>> = {};
    if (!formData.judul) newErrors.judul = 'Judul wajib diisi';
    if (!formData.anggota_kelompok) newErrors.anggota_kelompok = 'Minimal 1 anggota wajib diisi';
    if (!formData.sekolah) newErrors.sekolah = 'Sekolah/Instansi wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (name === 'max_pages' ? parseInt(value) || 0 : value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !isGenerating) {
      onGenerate(formData);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        {(['identity', 'config', 'advanced'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'identity' ? '1. Identitas' : tab === 'config' ? '2. Konfigurasi' : '3. Fitur Lanjut'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {activeTab === 'identity' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Judul Dokumen</label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Masukkan judul penelitian atau makalah..."
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                />
                {errors.judul && <p className="text-[10px] text-error font-bold">{errors.judul}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Kelompok</label>
                <input
                  type="text"
                  name="kelompok"
                  value={formData.kelompok}
                  onChange={handleChange}
                  placeholder="Contoh: Kelompok 05"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Kelas / Jurusan</label>
                <input
                  type="text"
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Anggota Kelompok</label>
                <textarea
                  name="anggota_kelompok"
                  value={formData.anggota_kelompok}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Masukkan nama anggota (pisahkan dengan baris baru)..."
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Sekolah / Kampus</label>
                <input
                  type="text"
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Tahun Akademik</label>
                <input
                  type="text"
                  name="tahun"
                  value={formData.tahun}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Jenis Dokumen</label>
                <select name="jenis" value={formData.jenis} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none font-semibold">
                  <option value="Makalah">Makalah</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Laporan">Laporan Praktikum</option>
                  <option value="Skripsi/Tesis">Skripsi / Tesis Outline</option>
                  <option value="Jurnal">Artikel Jurnal</option>
                  <option value="Custom">Custom Outline</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Level Akademik</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                  <option value="SMA">SMA</option>
                  <option value="Diploma (D3)">Diploma (D3)</option>
                  <option value="Sarjana (S1)">Sarjana (S1)</option>
                  <option value="Magister (S2)">Magister (S2)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Nada Tulisan</label>
                <select name="tone" value={formData.tone} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                  <option value="Formal">Formal Standard</option>
                  <option value="Sangat Formal">Sangat Formal (Kaku)</option>
                  <option value="Analitis">Analitis & Kritis</option>
                  <option value="Deskriptif">Deskriptif (Narasi)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Target Halaman (Max)</label>
                <input type="range" name="max_pages" min="5" max="50" step="5" value={formData.max_pages} onChange={handleChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>5 Hal</span>
                  <span className="text-primary">{formData.max_pages} Halaman</span>
                  <span>50 Hal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Gaya Sitasi (Referensi)</label>
                <select name="citation" value={formData.citation} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none font-semibold">
                  <option value="APA 7th">APA 7th Edition</option>
                  <option value="MLA">MLA Style</option>
                  <option value="Harvard">Harvard Reference</option>
                  <option value="IEEE">IEEE (Teknik)</option>
                  <option value="Chicago">Chicago Style</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Bahasa Target</label>
                <select name="bahasa" value={formData.bahasa} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none">
                  <option value="Indonesia">Indonesia (Formal)</option>
                  <option value="English">English (Academic)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" name="include_toc" checked={formData.include_toc} onChange={handleChange} className="sr-only" />
                  <div className={`w-10 h-5 rounded-full transition-colors ${formData.include_toc ? 'bg-primary' : 'bg-slate-300'}`}></div>
                  <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.include_toc ? 'translate-x-5' : ''}`}></div>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Generate Daftar Isi</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" name="include_ref" checked={formData.include_ref} onChange={handleChange} className="sr-only" />
                  <div className={`w-10 h-5 rounded-full transition-colors ${formData.include_ref ? 'bg-primary' : 'bg-slate-300'}`}></div>
                  <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.include_ref ? 'translate-x-5' : ''}`}></div>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Generate Daftar Pustaka</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Struktur Kustom (Opsional)</label>
              <textarea name="struktur" value={formData.struktur} onChange={handleChange} rows={2} placeholder="Sebutkan bab spesifik jika ada..." className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none" />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            disabled={isGenerating}
            className={`flex-[2] py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl ${
              isGenerating 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Generate Professional Document
              </>
            )}
          </button>
          <button
            type="button"
            className="flex-1 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
