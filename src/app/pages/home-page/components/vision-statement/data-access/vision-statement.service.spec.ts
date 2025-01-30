import { TestBed } from '@angular/core/testing';

import { VisionStatementService } from './vision-statement.service';

describe('VisionStatementService', () => {
  let service: VisionStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisionStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
