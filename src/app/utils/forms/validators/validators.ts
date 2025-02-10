import { validateAtLeastOneSelected } from './at-least-one-selected';
import { validatePhoneNumber } from './phone-number';

export const Validators = {
  phoneNumber: validatePhoneNumber,
  atLeastOneSelected: validateAtLeastOneSelected,
} as const;
