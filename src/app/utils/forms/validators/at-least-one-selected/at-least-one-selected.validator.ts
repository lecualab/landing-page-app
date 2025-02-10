import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validateAtLeastOneSelected: ValidatorFn = ({
  value,
}: AbstractControl<Readonly<Partial<Record<PropertyKey, boolean>>>>) => {
  return Object.values(value).some(Boolean)
    ? null
    : { atLeastOneSelected: true };
};
