
import { GoogleGenAI } from "@google/genai";
import { DocumentForm } from "../types";

export class GeminiService {
  /**
   * Generates academic document content using the Gemini API.
   * Following guidelines: late initialization of GoogleGenAI and direct access to .text property.
   * Added retry logic for 429 Resource Exhausted errors.
   */
  async generateDocumentContent(formData: DocumentForm): Promise<string> {
    // API key is obtained exclusively from process.env.API_KEY as per system instructions
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const systemInstruction = `
      Anda adalah AI Document Engine Pro v2.5.5 - Senior Academic Content Architect.
      
      ATURAN MUTLAK FORMATTING:
      1. DAFTAR ISI: Apit dengan tag [TOC_START] dan [TOC_END]. Gunakan dot leaders.
      2. CHAPTER TITLES: Tulis "BAB X" kemudian di baris baru "JUDUL BAB".
         Contoh:
         BAB I
         PENDAHULUAN
      3. TANPA MARKDOWN: Jangan gunakan (**).
      4. VOLUME: Minimal 3000-4000 kata. Berikan penjelasan teoritis SMA SMAN 1 KALEDUPA yang sangat komprehensif dan formal.
      5. JANGAN ULANGI COVER.
    `;

    const prompt = `
      BUAT DOKUMEN LENGKAP: ${formData.jenis}
      JUDUL: ${formData.judul}
      MATA PELAJARAN: ${formData.subject}
      SEKOLAH: ${formData.sekolah}
      LOKASI: ${formData.kota}
      TINGKAT: SMA (Akademik Formal)
      METODE: ${formData.method}
      
      Struktur yang harus diikuti:
      - [TOC_START] ... [TOC_END]
      - KATA PENGANTAR
      - ABSTRAK
      - BAB I
        PENDAHULUAN
      - BAB II
        LANDASAN TEORI
      - BAB III
        METODE PENELITIAN
      - BAB IV
        PEMBAHASAN
      - BAB V
        PENUTUP
      - DAFTAR PUSTAKA
      
      Hasilkan analisis yang sangat tajam dan data yang relevan untuk tingkat SMA.
    `;

    return this.executeWithRetry(async () => {
      try {
        const response = await ai.models.generateContent({
          // Switching to Flash model as it has significantly higher quota limits than Pro.
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        const text = response.text || "";
        // Clean up common AI artifacts
        return text.replace(/\*\*/g, '').replace(/__/g, '').replace(/\n{3,}/g, '\n\n').trim();
      } catch (error: any) {
        console.error("Gemini API Error Detail:", error);
        throw error;
      }
    });
  }

  /**
   * Helper method to handle retries for 429 errors (Quota Exceeded)
   */
  private async executeWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 5000): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      const errorMsg = error?.message?.toLowerCase() || "";
      const isQuotaError = errorMsg.includes('429') || 
                           errorMsg.includes('quota') || 
                           errorMsg.includes('exhausted') || 
                           error?.status === 429;
      
      if (retries > 0 && isQuotaError) {
        console.warn(`Quota exceeded (429). Retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeWithRetry(fn, retries - 1, delay * 2);
      }
      
      if (isQuotaError) {
        throw new Error("Kapasitas AI penuh (Limit Quota Terlampaui). Silakan tunggu 1-2 menit dan coba lagi.");
      }
      
      throw new Error("Gagal generate konten akademik: " + (error.message || "Terjadi kesalahan pada sistem AI."));
    }
  }
}
