export class DecoderService {
  static decodeBase64(content: string): string {
    try {
      const binaryString = atob(content);

      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new TextDecoder("utf-8").decode(bytes);
    } catch (error) {
      console.error("Error decoding base64 content:", error);
      return "";
    }
  }
}
