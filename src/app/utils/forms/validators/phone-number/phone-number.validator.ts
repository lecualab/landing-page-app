import { AbstractControl, ValidatorFn } from '@angular/forms';
import { phone } from 'phone';

export const validatePhoneNumber: ValidatorFn = ({
  value,
}: AbstractControl<string>) => {
  if (!value) return null;

  const phoneResult = phone(value);
  return phoneResult.isValid ? null : { phoneNumber: true };
};
