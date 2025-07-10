import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightFormDetailComponent } from './my-flight-form-detail.component';

describe('MyFlightFormDetailComponent', () => {
  let component: MyFlightFormDetailComponent;
  let fixture: ComponentFixture<MyFlightFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFlightFormDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFlightFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
