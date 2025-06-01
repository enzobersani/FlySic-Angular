import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputFileAttachmentComponent } from './input-file-attachment.component';

describe('InputFileAttachmentComponent', () => {
  let component: InputFileAttachmentComponent;
  let fixture: ComponentFixture<InputFileAttachmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        InputFileAttachmentComponent,
    ],
    providers: []
}).compileComponents();

    fixture = TestBed.createComponent(InputFileAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onRemove event', () => {
    // Arrange
    const event = new Event('click');
    const spyEmit = spyOn(component.onRemove, 'emit');
    // Act
    component.removeFile(event);

    // Assert
    expect(spyEmit).toHaveBeenCalledWith(component.file);
  });
});
