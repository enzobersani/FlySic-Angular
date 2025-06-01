import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorMessage } from '../models/errors.model';
import { InputFileMessageComponent } from './input-file-message.component';

describe('InputFileMessageComponent', () => {
  let component: InputFileMessageComponent;
  let fixture: ComponentFixture<InputFileMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [InputFileMessageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(InputFileMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open and close', () => {
    let showEventSpy: jasmine.Spy;

    beforeEach(() => showEventSpy = spyOn(component.showEvent, 'next'));

    it('should show message with success message', () => {
      // Arrange
      const model: ErrorMessage = {
        message: 'mocked message',
        success: true
      }

      // Act
      component.open(model);

      // Assert
      expect(component.message).toBe(model.message);
      expect(component.success).toBe(model.success);
      expect(showEventSpy).toHaveBeenCalledWith(true);
    });

    it('should show message with error message', () => {
      // Arrange
      const model: ErrorMessage = {
        message: 'mocked message',
        success: false
      }

      // Act
      component.open(model);

      // Assert
      expect(component.message).toBe(model.message);
      expect(component.success).toBe(model.success);
      expect(showEventSpy).toHaveBeenCalledWith(true);
    });

    it('should close message', () => {
      // Act
      component.close();

      // Assert
      expect(showEventSpy).toHaveBeenCalledWith(false);
    });
  });
});
