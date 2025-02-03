import { TestBed } from '@angular/core/testing';

import { CommitmentService } from './commitment.service';

describe('CommitmentService', () => {
  let service: CommitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
