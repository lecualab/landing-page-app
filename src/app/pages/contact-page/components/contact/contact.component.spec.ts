import { render, screen } from '@testing-library/angular';
import { ContactComponent } from './contact.component';
import { ContactCustomerService } from './data-access/contact-customer';

describe('ContactComponent', () => {
  let contactCustomerService: jasmine.SpyObj<ContactCustomerService>;

  beforeEach(() => {
    contactCustomerService = jasmine.createSpyObj<ContactCustomerService>({
      $success: false,
      $isLoading: false,
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
      contactCustomerService = jasmine.createSpyObj<ContactCustomerService>({
        $success: true,
        $isLoading: false,
      });
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
