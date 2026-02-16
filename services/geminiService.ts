
import { GoogleGenAI } from "@google/genai";
import { DocumentForm } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateDocumentContent(formData: DocumentForm): Promise<string> {
    const systemInstruction = `
      Anda adalah pakar penulisan akademik profesional. 
      TUGAS: Buatkan konten dokumen akademik lengkap.
      ATURAN KETAT:
      1. JANGAN gunakan simbol pembatas seperti "---", "***", atau garis-garis dekoratif lainnya.
      2. JANGAN sertakan teks pembuka atau penutup seperti "Ini adalah makalah Anda" atau "Semoga membantu".
      3. Mulailah langsung dengan Judul atau BAB I.
      4. Gunakan Bahasa Indonesia yang sangat formal sesuai PUEBI.
      5. Jika level akademik adalah Sarjana/Magister, gunakan bahasa teknis dan referensi yang lebih mendalam.
      6. Format output harus bersih dan profesional, siap untuk dipindahkan ke Microsoft Word.
      7. Gunakan penomoran bertingkat yang konsisten (1.1, 1.1.1).
    `;

    const prompt = `
      Tipe Dokumen: ${formData.jenis}
      Level Akademik: ${formData.level}
      Judul: ${formData.judul}
      Kelompok: ${formData.kelompok}
      Anggota: ${formData.anggota_kelompok}
      Kelas/Jurusan: ${formData.kelas}
      Sekolah/Instansi: ${formData.sekolah}
      Tahun: ${formData.tahun}
      Target Halaman: ${formData.max_pages}
      Nada Tulisan: ${formData.tone}
      Gaya Sitasi: ${formData.citation}
      Bahasa: ${formData.bahasa}
      
      Struktur Tambahan: ${formData.struktur || 'Gunakan struktur standar akademik yang lengkap'}
      Fitur Ekstra: ${formData.include_toc ? 'Sertakan Daftar Isi' : ''}, ${formData.include_ref ? 'Sertakan Daftar Pustaka' : ''}

      Buatkan konten yang mendalam, argumentatif, dan berbasis data/teori yang relevan.
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.65,
        topP: 0.9,
      }
    });

    return response.text || "Gagal menghasilkan konten.";
  }
}
