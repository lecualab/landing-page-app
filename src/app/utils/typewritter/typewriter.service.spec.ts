import { TestBed } from '@angular/core/testing';
import { TypewriterService } from './typewriter.service';

describe.todo('TypewriterService', () => {
  let service: TypewriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypewriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
