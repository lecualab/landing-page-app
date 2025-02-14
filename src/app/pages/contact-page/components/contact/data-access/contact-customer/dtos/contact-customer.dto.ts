import { ContactMethod } from '../enums';

export type ContactCustomerDto = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string | null;
  message: string;
  preferredContactMethods: readonly ContactMethod[];
}>;
