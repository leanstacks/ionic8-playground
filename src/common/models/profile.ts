import { User } from './user';

/**
 * The `Profile` type.
 */
export type Profile = Pick<User, 'email' | 'name'> & {
  bio?: string;
};
