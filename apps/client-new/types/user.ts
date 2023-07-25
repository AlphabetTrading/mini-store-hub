import { Address } from "./address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  userProfile?: UserProfile;
};
type UserProfile = {
  address: Address;
};

