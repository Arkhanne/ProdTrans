import { TestBed } from '@angular/core/testing';

import { TranstactionsService } from './transtactions.service';

describe('TranstactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranstactionsService = TestBed.get(TranstactionsService);
    expect(service).toBeTruthy();
  });
});
