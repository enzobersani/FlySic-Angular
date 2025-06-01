import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputFileButtonComponent } from './input-file-button.component';

describe('InputFileButtonComponent', () => {
  let component: InputFileButtonComponent;
  let fixture: ComponentFixture<InputFileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [InputFileButtonComponent]
}).compileComponents();

    fixture = TestBed.createComponent(InputFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
