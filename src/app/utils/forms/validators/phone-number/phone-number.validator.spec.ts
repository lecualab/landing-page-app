import { validatePhoneNumber } from './phone-number.validator';

// INFO: This works as an integration test for the phone library
describe('validatePhoneNumber', () => {
  describe('when value is empty', () => {
    it('should return null', () => {
      const actual = validatePhoneNumber({ value: '' } as any);

      expect(actual).toBeNull();
    });
  });

  describe('when value is a valid phone number', () => {
    it('should return null', () => {
      const actual = validatePhoneNumber({ value: '+56987654321' } as any);

      expect(actual).toBeNull();
    });
  });

  describe('when value is an invalid phone number', () => {
    it('should return an error', () => {
      const actual = validatePhoneNumber({ value: 'invalid-number' } as any);

      expect(actual).toEqual({ phoneNumber: true });
    });
  });
});
