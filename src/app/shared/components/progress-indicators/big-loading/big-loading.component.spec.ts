import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigLoadingComponent } from './big-loading.component';

describe('BigLoadingComponent', () => {
  let component: BigLoadingComponent;
  let fixture: ComponentFixture<BigLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
