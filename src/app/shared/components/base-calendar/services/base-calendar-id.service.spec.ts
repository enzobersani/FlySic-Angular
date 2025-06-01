import { TestBed } from '@angular/core/testing';

import { CalendarIdService } from './base-calendar-id.service';

describe('CalendarIdService', () => {
  let service: CalendarIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarIdService]
    });
    service = TestBed.inject(CalendarIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
