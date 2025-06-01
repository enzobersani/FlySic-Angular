import { FileType } from '../enums/file-type.enum';
import { FileTypePipe } from '../pipes/file-type.pipe';
import { InputFileTextsService } from './input-file-texts.service';

describe('TextsService', () => {
  let service: InputFileTextsService;

  const maxSize: number = 15;
  const allowedTypes: FileType[] = [FileType.PDF, FileType.JPEG, FileType.PNG];
  const fileTypePipe: FileTypePipe = new FileTypePipe();

  beforeEach(() => {
    service = new InputFileTextsService(fileTypePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAsyncTexts()', () => {
    // Act
    const result = service.getAsyncTexts();

    // Assert
    expect(result).not.toBeUndefined();
  });

  it('should getText()', () => {
    // Act
    const result = service.getText(maxSize, allowedTypes);

    // Assert
    expect(result).not.toBeUndefined();
  });

  it('should get empty when the month is undefined', () => {
    // Act
    const reference = service.getText(maxSize, allowedTypes);
    const result = service.getReferenceIfTextsNotExists();

    // Assert
    expect(result).toEqual(reference);
  });

});
