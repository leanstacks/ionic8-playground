/**
 * The `Address` type.
 */
export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

/**
 * The `Company` type.
 */
export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

/**
 * The `User` type.
 */
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};
