import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCoinComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputCoinComponent;
  let fixture: ComponentFixture<InputCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
