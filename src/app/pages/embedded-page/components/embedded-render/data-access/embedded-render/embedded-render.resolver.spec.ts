import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { EmbeddedRenderDto } from './dtos';
import { embeddedRenderResolver } from './embedded-render.resolver';

describe('embeddedRenderResolver', () => {
  const executeResolver: ResolveFn<EmbeddedRenderDto> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      embeddedRenderResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
