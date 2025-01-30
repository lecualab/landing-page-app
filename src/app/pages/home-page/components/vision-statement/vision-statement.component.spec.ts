import { DeferBlockState } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { VisionStatementDto, VisionStatementService } from './data-access';
import { VisionStatementComponent } from './vision-statement.component';

describe('VisionStatementComponent', () => {
  let visionStatementService: jasmine.SpyObj<VisionStatementService>;

  describe('when vision statement is loaded', () => {
    beforeEach(() => {
      visionStatementService = jasmine.createSpyObj<VisionStatementService>({
        $hasValue: true,
        $visionStatement: {} as VisionStatementDto,
      });
    });

    it('should render the vision statement title', async () => {
      const expected = 'title';

      visionStatementService.$visionStatement.and.returnValues({
        title: expected as any,
      } as VisionStatementDto);

      await render(VisionStatementComponent, {
        componentProviders: [
          { provide: VisionStatementService, useValue: visionStatementService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.queryByTestId('vision-statement-title');

      expect(actual).toBeVisible();
      expect(actual).toHaveTextContent(expected);
    });

    it('should render the vision statement content', async () => {
      const expected = 'content';

      visionStatementService.$visionStatement.and.returnValues({
        content: expected,
      } as VisionStatementDto);

      await render(VisionStatementComponent, {
        componentProviders: [
          { provide: VisionStatementService, useValue: visionStatementService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.queryByTestId('vision-statement-content');

      expect(actual).toBeVisible();
      expect(actual).toHaveTextContent(expected);
    });

    it('should render the vision statement action', async () => {
      await render(VisionStatementComponent, {
        componentProviders: [
          { provide: VisionStatementService, useValue: visionStatementService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.queryByTestId('vision-statement-action');

      expect(actual).toBeVisible();
      expect(actual).toHaveAttribute('href', '/contact');
      expect(actual).toHaveTextContent('visionStatement.action');
    });

    it('should not display the loader', async () => {
      await render(VisionStatementComponent, {
        componentProviders: [
          { provide: VisionStatementService, useValue: visionStatementService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.queryByRole('progressbar');

      expect(actual).toBeNull();
    });
  });

  describe('when vision statement is loading', () => {
    beforeEach(() => {
      visionStatementService = jasmine.createSpyObj<VisionStatementService>({
        $hasValue: false,
      });
    });

    it('should render the loader', async () => {
      await render(VisionStatementComponent, {
        componentProviders: [
          { provide: VisionStatementService, useValue: visionStatementService },
        ],
      });

      const actual = screen.queryAllByRole('progressbar');

      actual.forEach((element) => {
        expect(element).toBeVisible();
      });
    });
  });
});
