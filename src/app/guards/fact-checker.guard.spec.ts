import { TestBed } from '@angular/core/testing';

import { FactCheckerGuard } from './fact-checker.guard';

describe('FactCheckerGuard', () => {
  let guard: FactCheckerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FactCheckerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
