import { User } from './user';

/**
 * The [user] `Profile` type.
 */
export type Profile = Pick<User, 'email' | 'name'> & {
  bio?: string;
  dateOfBirth?: string;
};
