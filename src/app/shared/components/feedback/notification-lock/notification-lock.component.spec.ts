import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLockComponent } from './notification-lock.component';

describe('NotificationLockComponent', () => {
  let component: NotificationLockComponent;
  let fixture: ComponentFixture<NotificationLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationLockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
