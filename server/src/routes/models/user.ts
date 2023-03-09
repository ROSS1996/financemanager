export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  country: string;
  firstname: string;
  lastname: string;
  first_name?: string;
  last_name?: string;
  birthdate: Date;
  phone: string;
  address: string;
}
