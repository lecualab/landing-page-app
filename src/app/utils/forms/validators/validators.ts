import { validatePhoneNumber } from './phone-number';

export const Validators = {
  phoneNumber: validatePhoneNumber,
} as const;
