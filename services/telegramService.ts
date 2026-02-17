
export class TelegramService {
  static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Sends a document (DOCX) to Telegram.
   */
  static async sendDocx(token: string, chatId: string, blob: Blob, filename: string, caption: string): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('document', blob, `${filename}.docx`);
      formData.append('caption', caption);
      formData.append('parse_mode', 'HTML');

      const url = `https://api.telegram.org/bot${token}/sendDocument`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Telegram API Network Error:", error);
      return false;
    }
  }

  static async testConnection(token: string): Promise<boolean> {
    if (!token) return false;
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
