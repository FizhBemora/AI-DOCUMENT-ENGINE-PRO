
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  AlignmentType, 
  HeadingLevel,
  Footer,
  Header,
  PageNumber,
  BorderStyle,
} from "https://esm.sh/docx@^9.0.0";
import { DocumentForm } from "../types";

export class DocxService {
  static async generate(content: string, formData: DocumentForm): Promise<Blob> {
    const lines = content.split('\n');
    const docChildren: any[] = [];

    // 1. PROFESSIONAL COVER PAGE
    docChildren.push(
      new Paragraph({
        border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 12 } },
        children: [new TextRun({ text: "=========================================================", bold: true })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: formData.jenis.toUpperCase(), bold: true, size: 28, font: "Times New Roman" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: formData.judul.toUpperCase(), bold: true, size: 36, font: "Times New Roman" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 600, after: 600 },
      }),
      new Paragraph({
        border: { top: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 12 } },
        children: [new TextRun({ text: "=========================================================", bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 1200 },
      }),
      
      new Paragraph({ 
        children: [new TextRun({ text: "Tugas Terstruktur Mata Pelajaran:", italics: true, size: 22 })], 
        alignment: AlignmentType.CENTER, 
        spacing: { after: 100 } 
      }),
      new Paragraph({ 
        children: [new TextRun({ text: formData.subject.toUpperCase(), bold: true, size: 24, color: "000000" })], 
        alignment: AlignmentType.CENTER, 
        spacing: { after: 1200 } 
      }),

      new Paragraph({
        children: [new TextRun({ text: "DISUSUN OLEH:", bold: true, size: 20 })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: formData.kelompok || "Penyusun Perorangan", bold: true, size: 24 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: formData.anggota_kelompok, break: 1, size: 22 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 1500 },
      }),

      new Paragraph({ 
        children: [new TextRun({ text: "GURU PEMBIMBING:", size: 20 })], 
        alignment: AlignmentType.CENTER, 
        spacing: { after: 100 } 
      }),
      new Paragraph({ 
        children: [new TextRun({ text: formData.dosen_pembimbing || "-", bold: true, size: 24 })], 
        alignment: AlignmentType.CENTER, 
        spacing: { after: 1800 } 
      }),

      new Paragraph({
        children: [new TextRun({ text: formData.sekolah.toUpperCase(), bold: true, size: 26 })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      }),
      new Paragraph({
        children: [new TextRun({ text: `TAHUN AJARAN ${formData.tahun}`, size: 22 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: formData.kota.toUpperCase(), bold: true, size: 22 })],
        alignment: AlignmentType.CENTER,
      })
    );

    let isInsideTOC = false;

    lines.forEach((line) => {
      let cleanLine = line.trim();
      if (!cleanLine) return;

      const upperLine = cleanLine.toUpperCase();

      if (upperLine.includes('[TOC_START]')) {
        isInsideTOC = true;
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: "DAFTAR ISI", bold: true, size: 28, color: "000000" })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 600 },
            pageBreakBefore: true,
          })
        );
        return;
      }

      if (upperLine.includes('[TOC_END]')) {
        isInsideTOC = false;
        return;
      }

      // ONLY BAB or other standalone sections trigger a page break
      const triggerPageBreak = (upperLine.startsWith('BAB') || 
                                upperLine.startsWith('ABSTRAK') || 
                                upperLine.startsWith('KATA PENGANTAR') ||
                                upperLine.startsWith('DAFTAR PUSTAKA')) && !isInsideTOC;

      // Special handling for the title that comes right after BAB to keep it on the same page
      const isChapterTitle = (upperLine === 'PENDAHULUAN' || 
                              upperLine === 'LANDASAN TEORI' || 
                              upperLine === 'METODOLOGI PENELITIAN' ||
                              upperLine === 'METODE PENELITIAN' ||
                              upperLine === 'PEMBAHASAN' || 
                              upperLine === 'PEMBAHASAN DAN ANALISIS' ||
                              upperLine === 'PENUTUP') && !isInsideTOC;

      if (triggerPageBreak) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: cleanLine, bold: true, size: 28, color: "000000" })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
            pageBreakBefore: true,
          })
        );
      } else if (isChapterTitle) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: cleanLine, bold: true, size: 28, color: "000000" })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 400 },
          })
        );
      } else if (/^\d+\.\d+/.test(cleanLine)) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: cleanLine, bold: true, size: 24, color: "000000" })],
            spacing: { before: 300, after: 150 },
          })
        );
      } else {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ 
                text: cleanLine, 
                bold: isInsideTOC && (upperLine.startsWith('BAB') || upperLine.startsWith('DAFTAR')),
                size: isInsideTOC ? 22 : 24,
                color: "000000" 
              })
            ],
            alignment: isInsideTOC ? AlignmentType.LEFT : AlignmentType.JUSTIFY,
            spacing: { 
              line: formData.line_spacing * 240, 
              after: isInsideTOC ? 80 : 200
            },
          })
        );
      }
    });

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: formData.margin_top * 567, 
              bottom: formData.margin_bottom * 567,
              left: formData.margin_left * 567,
              right: formData.margin_right * 567,
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ 
                    text: "Doc by AI Document Engine Pro", 
                    color: "666666", 
                    size: 16, 
                    italics: true 
                  })
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Halaman ", size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: docChildren,
      }],
    });

    return await Packer.toBlob(doc);
  }

  static download(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename || 'Document'}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
