import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionSelectedComponent } from './select-option-selected.component';

describe('SelectOptionSelectedComponent', () => {
  let component: SelectOptionSelectedComponent;
  let fixture: ComponentFixture<SelectOptionSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOptionSelectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOptionSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
