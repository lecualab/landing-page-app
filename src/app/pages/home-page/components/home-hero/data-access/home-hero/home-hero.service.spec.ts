import { TestBed } from '@angular/core/testing';
import { HomeHeroService } from './home-hero.service';

describe('HomeHeroService', () => {
  let service: HomeHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
