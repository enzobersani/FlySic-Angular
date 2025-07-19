import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
    });
    component = TestBed.createComponent(BaseComponent).componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to destroy', () => {
    const subs = new Subscription()
    component.toDestroy(subs);
    expect(component.objectsForDestruction.length).toBe(1);
  })
});
