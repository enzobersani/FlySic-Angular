import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelArrowComponent } from './main-panel-arrow.component';

describe('MainPanelArrowComponent', () => {
  let component: MainPanelArrowComponent;
  let fixture: ComponentFixture<MainPanelArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPanelArrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPanelArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
