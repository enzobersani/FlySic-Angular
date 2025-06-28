import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightFormsComponent } from './my-flight-forms.component';

describe('MyFlightFormsComponent', () => {
  let component: MyFlightFormsComponent;
  let fixture: ComponentFixture<MyFlightFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFlightFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFlightFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
