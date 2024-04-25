export interface Address {
  street: string;
  city: string;
  number: string;
  zipCode: string;
}

export interface PhoneNumber {
  number: string;
  type: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  afm: string;
  phoneNumber: PhoneNumber[];
  address: Address;
}
