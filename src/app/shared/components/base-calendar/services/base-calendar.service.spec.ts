import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { CalendarService } from './base-calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add subscriptions to objectsForDestruction', () => {
    const subscription = new Subscription();
    service.toDestroy(subscription);
    expect(service.objectsForDestruction).toContain(subscription);
  });

  it('should unsubscribe all subscriptions on ngOnDestroy', () => {
    const subscription1 = new Subscription();
    const subscription2 = new Subscription();
    spyOn(subscription1, 'unsubscribe');
    spyOn(subscription2, 'unsubscribe');

    service.toDestroy(subscription1);
    service.toDestroy(subscription2);
    service.ngOnDestroy();

    expect(subscription1.unsubscribe).toHaveBeenCalled();
    expect(subscription2.unsubscribe).toHaveBeenCalled();
  });
});