import { createMock } from '@golevelup/ts-vitest';
import { render, screen } from '@testing-library/angular';
import { NEVER, of } from 'rxjs';
import type { MockedObject } from 'vitest';
import { ContactComponent } from './contact.component';
import { ContactCustomerService } from './data-access/contact-customer';

describe('ContactComponent', () => {
  let contactCustomerService: MockedObject<ContactCustomerService>;

  beforeEach(() => {
    contactCustomerService = createMock<ContactCustomerService>({
      success$: NEVER,
      error$: NEVER,
    });
  });

  it('should show the contact form', async () => {
    await render(ContactComponent, {
      providers: [
        { provide: ContactCustomerService, useValue: contactCustomerService },
      ],
    });

    const actual = screen.getByRole('form');

    expect(actual).toBeVisible();
  });

  describe('when the form was submitted successfully', () => {
    beforeEach(() => {
      vi.spyOn(contactCustomerService, 'success$', 'get').mockReturnValue(
        of(undefined),
      );
    });

    it('should show the success message', async () => {
      await render(ContactComponent, {
        providers: [
          { provide: ContactCustomerService, useValue: contactCustomerService },
        ],
      });

      const actual = screen.getByTestId('contact-form-received');

      expect(actual).toBeVisible();
    });

    it('should hide the form', async () => {
      await render(ContactComponent, {
        providers: [
          { provide: ContactCustomerService, useValue: contactCustomerService },
        ],
      });

      const actual = screen.queryByRole('form');

      expect(actual).toBeNull();
    });
  });
});
