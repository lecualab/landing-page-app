import * as PhoneModule from 'phone';
import { validatePhoneNumber } from './phone-number.validator';

describe('validatePhoneNumber', () => {
  let phone: jasmine.Spy<typeof PhoneModule.phone>;

  beforeEach(() => {
    phone = spyOn(PhoneModule, 'phone');
  });

  describe('when value is empty', () => {
    it('should return null', () => {
      const actual = validatePhoneNumber({ value: '' } as any);

      expect(actual).toBeNull();
    });
  });

  describe('when value is a valid phone number', () => {
    beforeEach(() => {
      phone.and.returnValue({ isValid: true } as any);
    });

    it('should return null', () => {
      const actual = validatePhoneNumber({ value: '1234567890' } as any);

      expect(actual).toBeNull();
    });
  });

  describe('when value is an invalid phone number', () => {
    beforeEach(() => {
      phone.and.returnValue({ isValid: false } as any);
    });

    it('should return an error', () => {
      const actual = validatePhoneNumber({ value: '1234567890' } as any);

      expect(actual).toEqual({ phoneNumber: true });
    });
  });
});
