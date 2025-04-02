import { TestBed } from '@angular/core/testing';
import { EmbeddedRenderService } from './embedded-render.service';

// TODO: Implement tests
xdescribe('EmbeddedRenderService', () => {
  let service: EmbeddedRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbeddedRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
