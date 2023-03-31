import { TestBed } from '@angular/core/testing';

import { LogrouteGuard } from './logroute.guard';

describe('LogrouteGuard', () => {
  let guard: LogrouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogrouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
