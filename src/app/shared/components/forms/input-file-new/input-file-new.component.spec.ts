import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileNewComponent } from './input-file-new.component';

describe('InputFileNewComponent', () => {
  let component: InputFileNewComponent;
  let fixture: ComponentFixture<InputFileNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
