import { TestBed } from '@angular/core/testing';
import { ContactCustomerService } from './contact-customer.service';

describe.todo('ContactCustomerService', () => {
  let service: ContactCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
