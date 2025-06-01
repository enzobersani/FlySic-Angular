import { FileType } from "../enums/file-type.enum";

export class MimeTypeHelper {
  constructor () {}

  public static getMimeType(fileType: FileType): string[] {
    switch (fileType) {
      case FileType.PDF:
        return ['application/pdf'];
      case FileType.ZIP:
        return ['application/zip'];
      case FileType.RAR:
        return ['application/x-rar-compressed'];
      case FileType.DOCx:
        return ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      case FileType.XLSx:
        return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      case FileType.JPEG:
      case FileType.JPG:
        return ['image/jpeg'];
      case FileType.PNG:
        return ['image/png'];
      case FileType.SVG:
        return ['image/svg+xml'];
      case FileType.TXT:
        return ['text/plain'];
      case FileType.CSV:
        return ['text/csv'];
      case FileType.XML:
        return ['application/xml', 'text/xml'];
    }
  }
}